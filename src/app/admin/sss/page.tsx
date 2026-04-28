'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function SssAdmin() {
  return (
    <AdminCrudPage
      table="faqs"
      title="Sıkça Sorulan Sorular"
      orderBy="sort_order"
      nameKey="question"
      defaultValues={{
        question: '',
        answer: '',
        category: 'Genel',
        sort_order: 0,
        is_active: true,
      }}
      fields={[
        { key: 'question', label: 'Soru', type: 'text', required: true },
        { key: 'answer', label: 'Cevap', type: 'textarea', required: true },
        { key: 'category', label: 'Kategori', type: 'select', options: ['Genel', 'Lazer Epilasyon', 'Cilt Bakımı', 'Bölgesel İncelme', 'Randevu'] },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
    />
  )
}
