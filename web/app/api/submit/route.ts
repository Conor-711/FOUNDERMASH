import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { founder, nickname, email, story } = body;

    // Validate required fields
    if (!founder || !nickname || !story) {
      return NextResponse.json(
        { error: 'Missing required fields. Founder, nickname, and story are required.' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (founder.length > 100) {
      return NextResponse.json(
        { error: 'Founder name is too long (max 100 characters)' },
        { status: 400 }
      );
    }

    if (nickname.length > 50) {
      return NextResponse.json(
        { error: 'Nickname is too long (max 50 characters)' },
        { status: 400 }
      );
    }

    if (story.length > 5000) {
      return NextResponse.json(
        { error: 'Story is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    if (email && email.length > 100) {
      return NextResponse.json(
        { error: 'Email is too long (max 100 characters)' },
        { status: 400 }
      );
    }

    // Basic email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.submission.create({
      data: {
        founder: founder.trim(),
        nickname: nickname.trim(),
        email: email ? email.trim() : null,
        story: story.trim(),
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Story submitted successfully!',
        id: submission.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve submissions (for admin use)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const submissions = await prisma.submission.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        founder: true,
        nickname: true,
        email: true,
        story: true,
        createdAt: true,
      },
    });

    const total = await prisma.submission.count();

    return NextResponse.json({
      submissions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
