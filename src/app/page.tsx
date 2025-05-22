import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { NewsContainer } from '@/components/dashboard/news-container'

export default function Home() {
  return (
    <DashboardLayout>
      <NewsContainer />
    </DashboardLayout>
  )
}
