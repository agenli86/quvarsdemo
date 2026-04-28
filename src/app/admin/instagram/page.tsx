'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function InstagramAdmin() {
  return (
    <AdminCrudPage
      table="instagram_posts"
      title="Instagram Akışı (Manuel)"
      orderBy="posted_at"
      orderAsc={false}
      nameKey="caption"
      defaultValues={{
        image_url: '',
        caption: '',
        permalink: '',
        posted_at: new Date().toISOString().split('T')[0],
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'image_url', label: 'Görsel', type: 'image', required: true },
        { key: 'caption', label: 'Açıklama', type: 'textarea' },
        { key: 'permalink', label: 'Instagram Post Linki', type: 'text', placeholder: 'https://instagram.com/p/...' },
        { key: 'posted_at', label: 'Yayın Tarihi', type: 'date' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
