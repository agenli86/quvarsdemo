'use client'

import { useEffect, useState } from 'react'
import { Save, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import RichEditor from '@/components/admin/RichEditor'

interface Section {
  id: string
  section_key: string
  title: string | null
  subtitle: string | null
  content: string | null
  image_url: string | null
}

const SECTION_LABELS: Record<string, { name: string; desc: string }> = {
  welcome: {
    name: 'Hoş Geldiniz Bölümü',
    desc: 'Anasayfada video hero\'nun altında çıkan tanıtım bölümü.',
  },
  hakkimizda: {
    name: 'Hakkımızda Sayfası İçeriği',
    desc: '/hakkimizda sayfasının ana metni.',
  },
  cta_banner: {
    name: 'Anasayfa Kampanya Banner',
    desc: 'Galeri öncesi büyük CTA banner. Kampanyalar boşsa bu görünür.',
  },
}

export default function AnasayfaAdmin() {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('homepage_content').select('*').order('section_key')
    setSections(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const update = (key: string, field: string, value: any) => {
    setSections((prev) => prev.map((s) => (s.section_key === key ? { ...s, [field]: value } : s)))
  }

  const save = async (section: Section) => {
    setSaving(section.section_key)
    const { error } = await supabase
      .from('homepage_content')
      .update({
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        image_url: section.image_url,
      })
      .eq('id', section.id)
    setSaving(null)
    if (error) {
      alert('Kayıt hatası: ' + error.message)
    } else {
      alert('Kaydedildi ✓')
    }
  }

  if (loading) return <p className="text-gray-400">Yükleniyor...</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
          <FileText size={24} /> Anasayfa İçerikleri
        </h1>
        <p className="text-gray-600 mt-1">Anasayfada görünen sabit içerik bloklarını buradan düzenleyebilirsiniz.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const label = SECTION_LABELS[section.section_key] || { name: section.section_key, desc: '' }
          return (
            <div key={section.id} className="admin-card">
              <div className="border-b pb-3 mb-4">
                <h2 className="text-lg font-bold text-purple-700">{label.name}</h2>
                <p className="text-xs text-gray-500 mt-1">{label.desc} <code className="bg-gray-100 px-1 rounded text-purple-600">{section.section_key}</code></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Başlık</label>
                  <input
                    className="admin-input"
                    value={section.title || ''}
                    onChange={(e) => update(section.section_key, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Alt Başlık</label>
                  <input
                    className="admin-input"
                    value={section.subtitle || ''}
                    onChange={(e) => update(section.section_key, 'subtitle', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Görsel (opsiyonel)</label>
                  <ImageUpload value={section.image_url || ''} onChange={(url) => update(section.section_key, 'image_url', url)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">İçerik</label>
                  {section.section_key === 'hakkimizda' ? (
                    <textarea
                      rows={8}
                      className="admin-input"
                      value={section.content || ''}
                      onChange={(e) => update(section.section_key, 'content', e.target.value)}
                      placeholder="Her paragraf yeni satır olarak yazılır."
                    />
                  ) : (
                    <textarea
                      rows={4}
                      className="admin-input"
                      value={section.content || ''}
                      onChange={(e) => update(section.section_key, 'content', e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t">
                <button
                  onClick={() => save(section)}
                  disabled={saving === section.section_key}
                  className="admin-btn admin-btn-primary disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{saving === section.section_key ? 'Kaydediliyor...' : 'Kaydet'}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
