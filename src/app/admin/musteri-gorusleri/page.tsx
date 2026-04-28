'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function MusteriGorusleriAdmin() {
  return (
    <AdminCrudPage
      table="testimonials"
      title="Müşteri Görüşleri"
      orderBy="sort_order"
      nameKey="name"
      defaultValues={{
        name: '',
        location: '',
        comment: '',
        rating: 5,
        source: 'Google',
        avatar_url: '',
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { key: 'name', label: 'İsim', type: 'text', required: true },
        { key: 'location', label: 'Konum/Şehir', type: 'text', placeholder: 'Kayseri' },
        { key: 'rating', label: 'Puan (1-5)', type: 'number' },
        { key: 'source', label: 'Kaynak', type: 'select', options: ['Google', 'Instagram', 'Site', 'Telefon', 'Diğer'] },
        { key: 'avatar_url', label: 'Profil Fotoğrafı (opsiyonel)', type: 'image' },
        { key: 'comment', label: 'Yorum', type: 'textarea', required: true },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
