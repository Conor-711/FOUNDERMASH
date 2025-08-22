import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface AnalyticsStats {
  pageViews: {
    total: number;
    unique: number;
    byPage: Array<{ page: string; count: number }>;
    last24h: number;
    last7days: number;
  };
  clickEvents: {
    total: number;
    byType: Array<{ eventType: string; count: number }>;
    byTarget: Array<{ target: string; count: number }>;
    last24h: number;
  };
  topFounders: Array<{ founder: string; clicks: number }>;
  topPages: Array<{ page: string; views: number }>;
  userSessions: {
    total: number;
    active24h: number;
    avgPageViews: number;
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '7', 10);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Page view statistics
    const totalPageViews = await prisma.pageView.count();
    const uniquePageViews = await prisma.pageView.groupBy({
      by: ['sessionId'],
      where: { sessionId: { not: null } },
    });

    const pageViewsByPage = await prisma.pageView.groupBy({
      by: ['page'],
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 10,
    });

    const pageViewsLast24h = await prisma.pageView.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const pageViewsLast7days = await prisma.pageView.count({
      where: {
        createdAt: { gte: startDate },
      },
    });

    // Click event statistics
    const totalClicks = await prisma.clickEvent.count();
    
    const clicksByType = await prisma.clickEvent.groupBy({
      by: ['eventType'],
      _count: { eventType: true },
      orderBy: { _count: { eventType: 'desc' } },
    });

    const clicksByTarget = await prisma.clickEvent.groupBy({
      by: ['target'],
      _count: { target: true },
      where: { target: { not: null } },
      orderBy: { _count: { target: 'desc' } },
      take: 10,
    });

    const clicksLast24h = await prisma.clickEvent.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    // Top founders by clicks (founder_select events)
    const topFounders = await prisma.clickEvent.groupBy({
      by: ['target'],
      _count: { target: true },
      where: {
        eventType: 'founder_select',
        target: { not: null },
      },
      orderBy: { _count: { target: 'desc' } },
      take: 10,
    });

    // User session statistics
    const uniqueSessions = await prisma.pageView.groupBy({
      by: ['sessionId'],
      where: { sessionId: { not: null } },
    });

    const activeSessions24h = await prisma.pageView.groupBy({
      by: ['sessionId'],
      where: {
        sessionId: { not: null },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const avgPageViews = uniqueSessions.length > 0 ? totalPageViews / uniqueSessions.length : 0;

    const stats: AnalyticsStats = {
      pageViews: {
        total: totalPageViews,
        unique: uniquePageViews.length,
        byPage: pageViewsByPage.map(item => ({
          page: item.page,
          count: item._count.page,
        })),
        last24h: pageViewsLast24h,
        last7days: pageViewsLast7days,
      },
      clickEvents: {
        total: totalClicks,
        byType: clicksByType.map(item => ({
          eventType: item.eventType,
          count: item._count.eventType,
        })),
        byTarget: clicksByTarget.map(item => ({
          target: item.target || 'unknown',
          count: item._count.target,
        })),
        last24h: clicksLast24h,
      },
      topFounders: topFounders.map(item => ({
        founder: item.target || 'unknown',
        clicks: item._count.target,
      })),
      topPages: pageViewsByPage.map(item => ({
        page: item.page,
        views: item._count.page,
      })),
      userSessions: {
        total: uniqueSessions.length,
        active24h: activeSessions24h.length,
        avgPageViews: Math.round(avgPageViews * 100) / 100,
      },
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
