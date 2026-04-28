'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Image as IconImage, Wrench, Users, BookOpen, Camera,
  Star, Megaphone, HelpCircle, ClipboardList, Mail, Search, Settings,
  Instagram, LogOut, X, Sparkles, FileText
} from 'lucide-react'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/slider', label: 'Slider', icon: IconImage },
  { href: '/admin/anasayfa', label: 'Anasayfa İçerikleri', icon: FileText },
  { href: '/admin/hizmetler', label: 'Hizmetler', icon: Wrench },
  { href: '/admin/uzmanlar', label: 'Uzmanlar', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/galeri', label: 'Galeri', icon: Camera },
  { href: '/admin/musteri-gorusleri', label: 'Müşteri Görüşleri', icon: Star },
  { href: '/admin/kampanyalar', label: 'Kampanyalar', icon: Megaphone },
  { href: '/admin/sss', label: 'SSS', icon: HelpCircle },
  { href: '/admin/instagram', label: 'Instagram Akışı', icon: Instagram },
  { href: '/admin/randevular', label: 'Randevu Talepleri', icon: ClipboardList },
  { href: '/admin/iletisim-formlari', label: 'İletişim Formları', icon: Mail },
  { href: '/admin/sayfa-seo', label: 'Sayfa SEO', icon: Search },
  { href: '/admin/ayarlar', label: 'Site Ayarları', icon: Settings },
]

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/giris')
    router.refresh()
  }

  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <>
      {open && <div className="md:hidden fixed inset-0 bg-black/50 z-20" onClick={onClose} />}
      <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">Quvars</div>
              <div className="text-[10px] text-white/60 tracking-wider">ADMIN PANEL</div>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="py-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); router.push(item.href); onClose() }}
                className={`admin-sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <Icon size={17} /> {item.label}
              </a>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-purple-900/40">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar-link text-xs mb-1">
            🌐 Siteyi Görüntüle
          </a>
          <button onClick={handleLogout} className="admin-sidebar-link w-full text-pink-300 hover:text-pink-200">
            <LogOut size={17} /> Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  )
}
