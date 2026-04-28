'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function KampanyalarAdmin() {
  return (
    <AdminCrudPage
      table="campaigns"
      title="Kampanyalar"
      orderBy="sort_order"
      nameKey="title"
      defaultValues={{
        title: '',
        description: '',
        image_url: '',
        cta_text: 'Detaylı Bilgi',
        cta_link: '/iletisim',
        badge_text: '',
        valid_until: null,
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', required: true },
        { key: 'badge_text', label: 'Etiket', type: 'text', placeholder: 'Yaza Özel, Yeni Müşteri Hediyesi vb.' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'description', label: 'Açıklama', type: 'textarea' },
        { key: 'cta_text', label: 'Buton Yazısı', type: 'text' },
        { key: 'cta_link', label: 'Buton Linki', type: 'text' },
        { key: 'valid_until', label: 'Bitiş Tarihi', type: 'date' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
