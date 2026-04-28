'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function GaleriAdmin() {
  return (
    <AdminCrudPage
      table="gallery"
      title="Galeri"
      orderBy="sort_order"
      nameKey="title"
      defaultValues={{
        title: '',
        image_url: '',
        alt_text: '',
        category: '',
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'title', label: 'Başlık', type: 'text' },
        { key: 'image_url', label: 'Görsel', type: 'image', required: true },
        { key: 'alt_text', label: 'Alt Metni (SEO)', type: 'text' },
        { key: 'category', label: 'Kategori', type: 'select', options: ['Salon', 'Lazer Epilasyon', 'Cilt Bakımı', 'Nail Art', 'Öncesi-Sonrası'] },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
