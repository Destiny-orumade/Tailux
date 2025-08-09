// pages/dashboard/index.tsx
import DashboardLayout from '@/app/components/layouts/DashBoardLayout'
import SalesReport from '@/app/components/dashboard/SalesReport'
import StatsCards from '@/app/components/dashboard/StatsCard'
import ProductTable from './components/dashboard/ProductTable'
// import MiniWidgets from '@/app/components/dashboard/MiniWidgets'

export default function DashboardHome() {
  return (
    <main className="pt-16  min-h-screen bg-[#11121C] ml-16">
  <DashboardLayout>
      <div className="space-y-6">
        <StatsCards />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalesReport/>
          </div>
  
        </div>
         <ProductTable />
      </div>
    </DashboardLayout>

    </main>
  )
}
