'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'
import { ICON_OPTIONS } from '@/lib/constants'

export default function HizmetlerAdmin() {
  return (
    <AdminCrudPage
      table="services"
      title="Hizmetler"
      orderBy="sort_order"
      nameKey="name"
      defaultValues={{
        name: '',
        slug: '',
        title: '',
        meta_description: '',
        short_description: '',
        content: '',
        icon: 'sparkles',
        image_url: '',
        price_text: '',
        duration_text: '',
        is_active: true,
        is_featured: false,
        sort_order: 0,
      }}
      fields={[
        { key: 'name', label: 'Hizmet Adı', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'lazer-epilasyon' },
        { key: 'title', label: 'SEO Başlığı', type: 'text' },
        { key: 'meta_description', label: 'Meta Açıklama', type: 'textarea' },
        { key: 'short_description', label: 'Kısa Açıklama', type: 'textarea', placeholder: 'Kart üzerinde görünecek 1-2 cümle' },
        { key: 'content', label: 'Detaylı İçerik', type: 'html' },
        { key: 'icon', label: 'İkon', type: 'select', options: ICON_OPTIONS },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'duration_text', label: 'Süre Yazısı', type: 'text', placeholder: '45-60 dakika' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_featured', label: 'Anasayfada Öne Çıkar', type: 'checkbox' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
