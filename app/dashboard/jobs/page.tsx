import { JobsTable } from '@/components/dashboard/jobs-table'

export default function JobsPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Jobs</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage all active, pending, and closed job listings.</p>
      </div>
      <JobsTable />
    </div>
  )
}

