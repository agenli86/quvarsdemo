'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function SliderAdmin() {
  return (
    <AdminCrudPage
      table="sliders"
      title="Slider"
      orderBy="sort_order"
      nameKey="title"
      defaultValues={{
        title: '',
        subtitle: '',
        image_url: '',
        button_text: 'Detaylı Bilgi',
        button_link: '/randevu',
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', required: true },
        { key: 'subtitle', label: 'Alt Başlık', type: 'text' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'button_text', label: 'Buton Yazısı', type: 'text' },
        { key: 'button_link', label: 'Buton Linki', type: 'text', placeholder: '/randevu' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
