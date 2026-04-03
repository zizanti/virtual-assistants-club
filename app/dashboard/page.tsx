'use client'

import { useState } from 'react'
import { Calendar, Download, Users, Briefcase, FileText, Trophy } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/metric-card'
import { ApplicationsChart } from '@/components/dashboard/applications-chart'
import { TrafficSourcesChart } from '@/components/dashboard/traffic-chart'
import { AutomationStatus } from '@/components/dashboard/automation-status'
import { AIRecommendations } from '@/components/dashboard/ai-recommendations'
import { RecentApplicationsTable } from '@/components/dashboard/applications-table'
import { PendingJobsCard } from '@/components/dashboard/pending-jobs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year']

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [showRangePicker, setShowRangePicker] = useState(false)

  return (
    <div className="max-w-[1400px] mx-auto space-y-7">
      {/* Welcome Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Welcome back, Santi 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening across your VA network today.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Date Selector */}
          <div className="relative">
            <button
              onClick={() => setShowRangePicker(!showRangePicker)}
              className="flex items-center gap-2 h-9 rounded-xl border border-border bg-card px-4 text-xs text-muted-foreground hover:border-gold/30 hover:text-foreground transition-colors"
            >
              <Calendar size={13} className="text-gold" />
              {dateRange}
            </button>
            {showRangePicker && (
              <div className="absolute top-11 right-0 z-50 rounded-xl border border-border bg-card shadow-xl py-1.5 min-w-[160px]">
                {DATE_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range)
                      setShowRangePicker(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors hover:text-foreground ${
                      dateRange === range ? 'text-gold' : 'text-muted-foreground'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-9 border-border text-muted-foreground hover:text-foreground hover:border-gold/30 text-xs gap-1.5"
            onClick={() => toast.success('Report exported successfully')}
          >
            <Download size={13} />
            Export
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Total VAs Registered"
          value={2418}
          trend={12.5}
          trendLabel="vs last month"
          color="gold"
          icon={<Users size={16} />}
        />
        <MetricCard
          title="Active Job Listings"
          value={184}
          trend={8.3}
          trendLabel="vs last month"
          color="default"
          icon={<Briefcase size={16} />}
        />
        <MetricCard
          title="Applications This Week"
          value={347}
          trend={-3.1}
          trendLabel="vs last week"
          color="orange"
          icon={<FileText size={16} />}
        />
        <MetricCard
          title="Placements Made"
          value={93}
          suffix="%"
          trend={4.7}
          trendLabel="placement rate"
          color="gold"
          icon={<Trophy size={16} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ApplicationsChart />
        </div>
        <div className="flex flex-col gap-4">
          <TrafficSourcesChart />
          <AutomationStatus />
        </div>
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <RecentApplicationsTable />
        </div>
        <div>
          <PendingJobsCard />
        </div>
      </div>
    </div>
  )
}
