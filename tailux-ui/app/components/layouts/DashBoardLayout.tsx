import Sidebar from './SideBar'
import Topbar from './TopBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-6 lg:p-8 bg-[#0f0f1a] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

