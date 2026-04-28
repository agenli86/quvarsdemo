'use client'

import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function BlogAdmin() {
  return (
    <AdminCrudPage
      table="blog_posts"
      title="Blog Yazıları"
      orderBy="created_at"
      orderAsc={false}
      nameKey="title"
      defaultValues={{
        title: '',
        slug: '',
        meta_description: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Cilt Bakımı',
        reading_time: 3,
        is_published: true,
      }}
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'lazer-epilasyon-faydalari' },
        { key: 'meta_description', label: 'Meta Açıklama (SEO)', type: 'textarea' },
        { key: 'excerpt', label: 'Özet', type: 'textarea', placeholder: 'Liste sayfasında görünecek kısa metin' },
        { key: 'category', label: 'Kategori', type: 'select', options: ['Cilt Bakımı', 'Lazer Epilasyon', 'Bölgesel İncelme', 'Nail Art', 'Genel', 'İpuçları'] },
        { key: 'reading_time', label: 'Okuma Süresi (dakika)', type: 'number' },
        { key: 'image_url', label: 'Kapak Görseli', type: 'image' },
        { key: 'content', label: 'Yazı İçeriği', type: 'html' },
        { key: 'is_published', label: 'Yayında', type: 'checkbox' },
      ]}
    />
  )
}
