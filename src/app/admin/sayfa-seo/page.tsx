'use client'

import { useEffect, useState } from 'react'
import { Save, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PageSeo {
  id: string
  page_key: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_image: string | null
}

const PAGE_LABELS: Record<string, string> = {
  anasayfa: 'Anasayfa (/)',
  hakkimizda: 'Hakkımızda (/hakkimizda)',
  hizmetler: 'Hizmetler (/hizmetler)',
  uzmanlar: 'Uzmanlar (/uzmanlar)',
  galeri: 'Galeri (/galeri)',
  blog: 'Blog (/blog)',
  randevu: 'Randevu (/randevu)',
  iletisim: 'İletişim (/iletisim)',
}

export default function SayfaSeoAdmin() {
  const [pages, setPages] = useState<PageSeo[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('page_seo').select('*').order('page_key')
    setPages(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const update = (key: string, field: string, value: any) => {
    setPages((prev) => prev.map((p) => (p.page_key === key ? { ...p, [field]: value } : p)))
  }

  const save = async (page: PageSeo) => {
    setSaving(page.page_key)
    const { error } = await supabase
      .from('page_seo')
      .update({
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        canonical_url: page.canonical_url,
        og_image: page.og_image,
      })
      .eq('id', page.id)
    setSaving(null)
    if (error) alert('Hata: ' + error.message)
    else alert('Kaydedildi ✓')
  }

  if (loading) return <p className="text-gray-400">Yükleniyor...</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
          <Search size={24} /> Sayfa SEO Yönetimi
        </h1>
        <p className="text-gray-600 mt-1">Her sayfanın meta title, description ve canonical URL bilgilerini düzenleyin.</p>
      </div>

      <div className="space-y-6">
        {pages.map((page) => (
          <div key={page.id} className="admin-card">
            <h2 className="text-lg font-bold text-purple-700 mb-1">{PAGE_LABELS[page.page_key] || page.page_key}</h2>
            <p className="text-xs text-gray-500 mb-4"><code className="bg-gray-100 px-1 rounded">{page.page_key}</code></p>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Meta Title <span className="text-xs text-gray-400">(60 karakteri geçmesin)</span>
                </label>
                <input
                  className="admin-input"
                  value={page.meta_title || ''}
                  onChange={(e) => update(page.page_key, 'meta_title', e.target.value)}
                  maxLength={70}
                />
                <div className="text-xs text-gray-400 mt-1">{(page.meta_title || '').length} / 60</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Meta Description <span className="text-xs text-gray-400">(160 karakteri geçmesin)</span>
                </label>
                <textarea
                  rows={3}
                  className="admin-input"
                  value={page.meta_description || ''}
                  onChange={(e) => update(page.page_key, 'meta_description', e.target.value)}
                  maxLength={170}
                />
                <div className="text-xs text-gray-400 mt-1">{(page.meta_description || '').length} / 160</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Canonical URL</label>
                <input
                  className="admin-input"
                  value={page.canonical_url || ''}
                  onChange={(e) => update(page.page_key, 'canonical_url', e.target.value)}
                  placeholder="https://quvarsbeauty.com/sayfa"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">OG Image (Sosyal medya görseli)</label>
                <input
                  className="admin-input"
                  value={page.og_image || ''}
                  onChange={(e) => update(page.page_key, 'og_image', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t">
              <button
                onClick={() => save(page)}
                disabled={saving === page.page_key}
                className="admin-btn admin-btn-primary disabled:opacity-50"
              >
                <Save size={16} />
                <span>{saving === page.page_key ? 'Kaydediliyor...' : 'Kaydet'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
