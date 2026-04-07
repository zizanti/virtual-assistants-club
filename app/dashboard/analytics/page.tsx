import { FileText, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { AnalyticsMetricCard } from '@/components/analytics/analytics-metric-card'
import { MonthlyApplicationsChart } from '@/components/analytics/monthly-applications-chart'
import { PlacementRateChart } from '@/components/analytics/placement-rate-chart'
import { JobCategoriesChart } from '@/components/analytics/job-categories-chart'
import { TopCompaniesTable } from '@/components/analytics/top-companies-table'

const METRICS = [
  {
    title: 'Total Applications',
    value: 845,
    trend: 18,
    trendLabel: 'vs last period',
    color: 'default' as const,
    icon: <FileText size={16} />,
    description: 'All-time across 12 active listings',
  },
  {
    title: 'Hired Rate',
    value: 20.9,
    suffix: '%',
    decimals: 1,
    trend: 9,
    trendLabel: 'vs last month',
    color: 'gold' as const,
    icon: <TrendingUp size={16} />,
    description: 'Applicants who received an offer',
  },
  {
    title: 'Avg Time to Hire',
    value: 11,
    suffix: ' days',
    trend: -8,
    trendLabel: 'vs last quarter',
    color: 'orange' as const,
    icon: <Clock size={16} />,
    description: 'From application to placement',
  },
  {
    title: 'Revenue Generated',
    value: 336200,
    prefix: '$',
    trend: 24,
    trendLabel: 'vs last quarter',
    color: 'gold' as const,
    icon: <DollarSign size={16} />,
    description: 'Estimated placement fees earned',
  },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Deep-dive into platform performance and hiring metrics.
        </p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <AnalyticsMetricCard key={m.title} {...m} />
        ))}
      </div>

      {/* Charts row — bar + line side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <MonthlyApplicationsChart />
        <PlacementRateChart />
      </div>

      {/* Categories + Companies row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2">
          <JobCategoriesChart />
        </div>
        <div className="xl:col-span-3">
          <TopCompaniesTable />
        </div>
      </div>
    </div>
  )
}

