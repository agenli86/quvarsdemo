'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function UzmanlarAdmin() {
  return (
    <AdminCrudPage
      table="specialists"
      title="Uzmanlar"
      orderBy="sort_order"
      nameKey="name"
      defaultValues={{
        name: '',
        slug: '',
        title: '',
        bio: '',
        image_url: '',
        specialties: [],
        instagram_url: '',
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'name', label: 'Ad Soyad', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'ayse-yilmaz' },
        { key: 'title', label: 'Ünvan', type: 'text', placeholder: 'Cilt Bakım Uzmanı' },
        { key: 'image_url', label: 'Fotoğraf', type: 'image' },
        { key: 'specialties', label: 'Uzmanlık Alanları (virgülle ayır)', type: 'array', placeholder: 'Lazer Epilasyon, Cilt Bakımı' },
        { key: 'instagram_url', label: 'Instagram URL', type: 'text', placeholder: 'https://instagram.com/...' },
        { key: 'bio', label: 'Biyografi', type: 'textarea' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
