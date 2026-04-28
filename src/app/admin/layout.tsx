'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import './admin.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/giris'

  if (isLoginPage) {
    return <div className="admin-wrapper">{children}</div>
  }

  return (
    <div className="admin-wrapper">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:hidden fixed top-0 left-0 right-0 bg-purple-900 text-white z-10 flex items-center justify-between px-4 h-14">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="font-bold text-sm">Quvars Admin</span>
        <div className="w-6" />
      </div>

      <div className="admin-main pt-16 md:pt-0">
        {children}
      </div>
    </div>
  )
}
