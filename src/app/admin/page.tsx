'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Image as IconImage, Wrench, Users, BookOpen, Camera, Star,
  Megaphone, ClipboardList, Mail, Instagram, HelpCircle, Sparkles
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const tables = [
        { key: 'sliders', table: 'sliders' },
        { key: 'services', table: 'services' },
        { key: 'specialists', table: 'specialists' },
        { key: 'blog_posts', table: 'blog_posts' },
        { key: 'gallery', table: 'gallery' },
        { key: 'testimonials', table: 'testimonials' },
        { key: 'campaigns', table: 'campaigns' },
        { key: 'faqs', table: 'faqs' },
        { key: 'instagram', table: 'instagram_posts' },
        { key: 'appointments', table: 'appointment_requests' },
        { key: 'contacts', table: 'contact_submissions' },
      ]
      const results: Record<string, number> = {}
      for (const t of tables) {
        const { count } = await supabase.from(t.table).select('*', { count: 'exact', head: true })
        results[t.key] = count || 0
      }
      const { count: unreadAppts } = await supabase.from('appointment_requests').select('*', { count: 'exact', head: true }).eq('is_read', false)
      const { count: unreadContacts } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false)
      results.unread_appointments = unreadAppts || 0
      results.unread_contacts = unreadContacts || 0
      setStats(results)
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Slider', count: stats.sliders, icon: IconImage, href: '/admin/slider', color: 'from-purple-500 to-purple-600' },
    { label: 'Hizmetler', count: stats.services, icon: Wrench, href: '/admin/hizmetler', color: 'from-pink-500 to-rose-500' },
    { label: 'Uzmanlar', count: stats.specialists, icon: Users, href: '/admin/uzmanlar', color: 'from-violet-500 to-purple-500' },
    { label: 'Blog Yazıları', count: stats.blog_posts, icon: BookOpen, href: '/admin/blog', color: 'from-indigo-500 to-purple-500' },
    { label: 'Galeri', count: stats.gallery, icon: Camera, href: '/admin/galeri', color: 'from-fuchsia-500 to-pink-500' },
    { label: 'Müşteri Görüşleri', count: stats.testimonials, icon: Star, href: '/admin/musteri-gorusleri', color: 'from-amber-400 to-rose-400' },
    { label: 'Kampanyalar', count: stats.campaigns, icon: Megaphone, href: '/admin/kampanyalar', color: 'from-rose-500 to-red-500' },
    { label: 'SSS', count: stats.faqs, icon: HelpCircle, href: '/admin/sss', color: 'from-teal-500 to-cyan-500' },
    { label: 'Instagram Postları', count: stats.instagram, icon: Instagram, href: '/admin/instagram', color: 'from-pink-500 via-purple-500 to-orange-400' },
    { label: 'Randevu Talepleri', count: stats.appointments, icon: ClipboardList, href: '/admin/randevular', color: 'from-yellow-500 to-orange-500', badge: stats.unread_appointments },
    { label: 'İletişim Formları', count: stats.contacts, icon: Mail, href: '/admin/iletisim-formlari', color: 'from-red-500 to-pink-500', badge: stats.unread_contacts },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
          <Sparkles size={12} />
          <span>Hoş Geldiniz</span>
        </div>
        <h1 className="text-3xl font-bold text-purple-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          Quvars Yönetim Paneli
        </h1>
        <p className="text-gray-600">Sitenizin tüm içeriklerini buradan yönetebilirsiniz.</p>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <>
          {/* Bekleyen işler uyarısı */}
          {(stats.unread_appointments > 0 || stats.unread_contacts > 0) && (
            <div className="admin-card mb-6 border-l-4 border-pink-500 bg-pink-50/50">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔔</div>
                <div>
                  <h3 className="font-bold text-pink-700">Dikkat: Yeni mesajlar var!</h3>
                  <div className="text-sm text-pink-600 mt-1 space-x-3">
                    {stats.unread_appointments > 0 && (
                      <a href="/admin/randevular" className="underline hover:text-pink-800">
                        {stats.unread_appointments} okunmamış randevu talebi
                      </a>
                    )}
                    {stats.unread_contacts > 0 && (
                      <a href="/admin/iletisim-formlari" className="underline hover:text-pink-800">
                        {stats.unread_contacts} okunmamış iletişim mesajı
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <a key={card.label} href={card.href} className="admin-card hover:shadow-lg transition-all relative group">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-br ${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900">{card.count ?? '-'}</div>
                      <div className="text-sm text-gray-600">{card.label}</div>
                    </div>
                  </div>
                  {card.badge ? (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {card.badge} yeni
                    </span>
                  ) : null}
                </a>
              )
            })}
          </div>

          <div className="mt-8 admin-card">
            <h2 className="text-lg font-bold text-purple-900 mb-3">İlk Adımlar</h2>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1️⃣ <strong>Site Ayarları</strong>'na git → logo, telefon, çalışma saatleri, sosyal medya bilgilerini ekle.</li>
              <li>2️⃣ <strong>Hizmetler</strong>'i düzenle → her hizmete görsel ve detaylı açıklama ekle.</li>
              <li>3️⃣ <strong>Uzmanlar</strong>'a kadronu ekle → fotoğraf, uzmanlık alanları.</li>
              <li>4️⃣ <strong>Slider</strong>'a görsel banner'ları ekle.</li>
              <li>5️⃣ <strong>Sayfa SEO</strong>'dan her sayfanın meta title ve description'ını optimize et.</li>
              <li>6️⃣ <strong>Blog</strong>'dan ilk yazılarını paylaş.</li>
            </ol>
          </div>
        </>
      )}
    </div>
  )
}
