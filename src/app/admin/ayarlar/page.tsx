'use client'

import { useEffect, useState } from 'react'
import { Save, Settings, Phone, Globe, Search, Instagram, Video, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'

interface SettingItem {
  id: string
  key: string
  value: string | null
}

const FIELD_DEFS: Record<string, { label: string; placeholder?: string; type?: 'text' | 'textarea' | 'image' | 'longtext'; help?: string }> = {
  // Genel
  site_name: { label: 'Site Adı' },
  site_tagline: { label: 'Site Sloganı' },
  logo_url: { label: 'Logo (üst menü)', type: 'image' },
  logo_footer_url: { label: 'Logo (footer / opsiyonel)', type: 'image' },
  // İletişim
  phone: { label: 'Telefon', placeholder: '0541 118 63 38' },
  whatsapp: { label: 'WhatsApp Numarası', placeholder: '905411186338', help: 'Ülke kodu ile, sadece rakam' },
  email: { label: 'E-posta' },
  address: { label: 'Adres', type: 'textarea' },
  working_hours: { label: 'Çalışma Saatleri' },
  google_maps_embed: { label: 'Google Maps Embed Kodu', type: 'longtext', help: '<iframe src="..."></iframe> şeklinde Google Maps\'ten kopyalanan iframe kodu' },
  // Sosyal medya
  instagram: { label: 'Instagram URL' },
  facebook: { label: 'Facebook URL' },
  tiktok: { label: 'TikTok URL' },
  youtube: { label: 'YouTube URL' },
  // Video Hero
  hero_video_url: { label: 'Anasayfa Hero Video URL', help: 'Boş bırakırsanız Pexels\'den varsayılan video oynar', placeholder: 'https://....mp4' },
  hero_poster_url: { label: 'Hero Video Poster (yedek görsel)', type: 'image' },
  // SEO / Doğrulama
  google_site_verification: { label: 'Google Search Console Doğrulama Kodu' },
  google_analytics_id: { label: 'Google Analytics ID', placeholder: 'G-XXXXXXX' },
  meta_pixel_id: { label: 'Meta (Facebook) Pixel ID' },
  google_reviews_place_id: { label: 'Google Place ID', help: 'Google yorumları için' },
  // Instagram API
  instagram_access_token: { label: 'Instagram API Access Token', help: 'Boşsa manuel mod kullanılır' },
  instagram_business_id: { label: 'Instagram Business Account ID' },
}

const GROUPS: Array<{ title: string; icon: any; keys: string[] }> = [
  { title: 'Genel', icon: Sparkles, keys: ['site_name', 'site_tagline', 'logo_url', 'logo_footer_url'] },
  { title: 'İletişim', icon: Phone, keys: ['phone', 'whatsapp', 'email', 'address', 'working_hours', 'google_maps_embed'] },
  { title: 'Sosyal Medya', icon: Instagram, keys: ['instagram', 'facebook', 'tiktok', 'youtube'] },
  { title: 'Hero Video', icon: Video, keys: ['hero_video_url', 'hero_poster_url'] },
  { title: 'SEO & Analytics', icon: Search, keys: ['google_site_verification', 'google_analytics_id', 'meta_pixel_id', 'google_reviews_place_id'] },
  { title: 'Instagram API (Opsiyonel)', icon: Globe, keys: ['instagram_access_token', 'instagram_business_id'] },
]

export default function AyarlarAdmin() {
  const [settings, setSettings] = useState<SettingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('site_settings').select('*').order('key')
    setSettings(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const get = (key: string) => settings.find((s) => s.key === key)

  const update = (key: string, value: string) => {
    setSettings((prev) => {
      const exists = prev.find((s) => s.key === key)
      if (exists) {
        return prev.map((s) => (s.key === key ? { ...s, value } : s))
      }
      return [...prev, { id: '', key, value }]
    })
  }

  const saveAll = async () => {
    setSaving(true)
    for (const s of settings) {
      if (s.id) {
        await supabase.from('site_settings').update({ value: s.value }).eq('id', s.id)
      } else {
        await supabase.from('site_settings').insert([{ key: s.key, value: s.value }])
      }
    }
    setSaving(false)
    await load()
    alert('Tüm ayarlar kaydedildi ✓')
  }

  if (loading) return <p className="text-gray-400">Yükleniyor...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
            <Settings size={24} /> Site Ayarları
          </h1>
          <p className="text-gray-600 mt-1">Site genel bilgileri, iletişim, sosyal medya ve teknik ayarlar.</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50">
          <Save size={16} />
          <span>{saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {GROUPS.map((group) => {
          const Icon = group.icon
          return (
            <div key={group.title} className="admin-card">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <Icon size={18} className="text-purple-600" />
                <h2 className="text-lg font-bold text-purple-700">{group.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.keys.map((key) => {
                  const def = FIELD_DEFS[key] || { label: key }
                  const item = get(key)
                  const val = item?.value || ''
                  const span = (def.type === 'textarea' || def.type === 'longtext' || def.type === 'image') ? 'md:col-span-2' : ''
                  return (
                    <div key={key} className={span}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{def.label}</label>
                      {def.type === 'image' ? (
                        <ImageUpload value={val} onChange={(url) => update(key, url)} />
                      ) : def.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          className="admin-input"
                          value={val}
                          onChange={(e) => update(key, e.target.value)}
                          placeholder={def.placeholder}
                        />
                      ) : def.type === 'longtext' ? (
                        <textarea
                          rows={5}
                          className="admin-input font-mono text-xs"
                          value={val}
                          onChange={(e) => update(key, e.target.value)}
                          placeholder={def.placeholder}
                        />
                      ) : (
                        <input
                          className="admin-input"
                          value={val}
                          onChange={(e) => update(key, e.target.value)}
                          placeholder={def.placeholder}
                        />
                      )}
                      {def.help && <div className="text-xs text-gray-500 mt-1">{def.help}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 sticky bottom-4 bg-white rounded-xl shadow-lg p-3 flex justify-end">
        <button onClick={saveAll} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50">
          <Save size={16} />
          <span>{saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}</span>
        </button>
      </div>
    </div>
  )
}
