'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Track page view
async function trackPageView(page: string) {
  if (typeof window === 'undefined') return;
  
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        page,
        sessionId: getSessionId(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined,
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track click event
export async function trackClick(eventType: string, target?: string, metadata?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'click',
        eventType,
        target,
        page: window.location.pathname,
        sessionId: getSessionId(),
        metadata,
      }),
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
}

// Analytics hook for page tracking
export function useAnalytics() {
  const pathname = usePathname();

  const trackEvent = useCallback((eventType: string, target?: string, metadata?: Record<string, unknown>) => {
    trackClick(eventType, target, metadata);
  }, []);

  useEffect(() => {
    // Track page view when pathname changes
    trackPageView(pathname);
  }, [pathname]);

  return { trackEvent };
}

// Analytics provider component
export default function Analytics() {
  useAnalytics();
  return null;
}

// Utility functions for common tracking events
export const analytics = {
  trackFounderSelect: (founderSlug: string, track: string) => {
    trackClick('founder_select', founderSlug, { track });
  },
  
  trackCategoryChange: (category: string, fromCategory?: string) => {
    trackClick('category_change', category, { fromCategory });
  },
  
  trackNavigation: (destination: string, source?: string) => {
    trackClick('navigation', destination, { source });
  },
  
  trackRankingClick: (founderSlug: string, rank: number, track: string) => {
    trackClick('ranking_click', founderSlug, { rank, track });
  },
  
  trackSubmit: (formType: string, success: boolean) => {
    trackClick('form_submit', formType, { success });
  },
  
  trackProfileView: (section: string) => {
    trackClick('profile_view', section);
  },
};
