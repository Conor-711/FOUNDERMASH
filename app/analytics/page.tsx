'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

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

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/stats?days=${days}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatPageName = (page: string) => {
    if (page === '/') return 'Home';
    if (page === '/ranking') return 'Ranking';
    if (page === '/profile') return 'Profile';
    if (page === '/about') return 'About';
    if (page === '/submit') return 'Submit';
    if (page.startsWith('/founder/')) return `Bio: ${page.split('/')[2]}`;
    return page;
  };

  const formatEventType = (eventType: string) => {
    return eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="text-center py-12">
          <div className="text-lg">Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="text-center py-12">
          <div className="text-red-600">Error: {error}</div>
          <button 
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      <div className="mb-6">
        <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
        <h1 className="text-3xl font-extrabold mt-4 mb-6">Analytics Dashboard</h1>
        
        <div className="mb-6">
          <label className="mr-2">Time Range:</label>
          <select 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            <option value={1}>Last 24 hours</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Page Views</h3>
          <div className="text-3xl font-bold text-blue-600">{stats.pageViews.total.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Last 24h: {stats.pageViews.last24h}</div>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Unique Visitors</h3>
          <div className="text-3xl font-bold text-green-600">{stats.userSessions.total.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Active 24h: {stats.userSessions.active24h}</div>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Clicks</h3>
          <div className="text-3xl font-bold text-purple-600">{stats.clickEvents.total.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Last 24h: {stats.clickEvents.last24h}</div>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Pages/Session</h3>
          <div className="text-3xl font-bold text-orange-600">{stats.userSessions.avgPageViews}</div>
          <div className="text-sm text-gray-500">Pages per visitor</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {stats.topPages.map((item, index) => (
              <div key={item.page} className="flex justify-between items-center">
                <span className="font-medium">{index + 1}. {formatPageName(item.page)}</span>
                <span className="text-blue-600 font-bold">{item.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Founders */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Most Selected Founders</h3>
          <div className="space-y-3">
            {stats.topFounders.map((item, index) => (
              <div key={item.founder} className="flex justify-between items-center">
                <span className="font-medium">{index + 1}. {item.founder}</span>
                <span className="text-green-600 font-bold">{item.clicks.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Click Events by Type */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Click Events by Type</h3>
          <div className="space-y-3">
            {stats.clickEvents.byType.map((item, index) => (
              <div key={item.eventType} className="flex justify-between items-center">
                <span className="font-medium">{index + 1}. {formatEventType(item.eventType)}</span>
                <span className="text-purple-600 font-bold">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Click Targets */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Most Clicked Targets</h3>
          <div className="space-y-3">
            {stats.clickEvents.byTarget.map((item, index) => (
              <div key={item.target} className="flex justify-between items-center">
                <span className="font-medium">{index + 1}. {item.target}</span>
                <span className="text-orange-600 font-bold">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchStats}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
