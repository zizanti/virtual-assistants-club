import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopBar } from '@/components/dashboard/topbar'

export const metadata = {
  title: 'Dashboard — Virtual Assistants Club',
  description: 'VAC Admin Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardTopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
