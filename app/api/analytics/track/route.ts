import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface TrackPageViewRequest {
  page: string;
  sessionId?: string;
  userAgent?: string;
  referrer?: string;
}

interface TrackClickEventRequest {
  eventType: string;
  target?: string;
  page: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (type === 'pageview') {
      const { page, sessionId, userAgent, referrer } = data as TrackPageViewRequest;
      
      await prisma.pageView.create({
        data: {
          page,
          sessionId,
          userAgent,
          referrer,
        },
      });

      return NextResponse.json({ success: true, type: 'pageview' });
    }

    if (type === 'click') {
      const { eventType, target, page, sessionId, metadata } = data as TrackClickEventRequest;
      
      await prisma.clickEvent.create({
        data: {
          eventType,
          target,
          page,
          sessionId,
          metadata: metadata ? JSON.stringify(metadata) : null,
        },
      });

      return NextResponse.json({ success: true, type: 'click' });
    }

    return NextResponse.json({ error: 'Invalid tracking type' }, { status: 400 });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
