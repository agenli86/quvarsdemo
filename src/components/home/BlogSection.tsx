import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/constants'

export default async function BlogSection() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
              <BookOpen size={12} />
              <span>Blog · Kayseri Güzellik Rehberi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
              Cilt bakımı &amp; lazer epilasyon{' '}
              <span className="text-gradient italic">uzmanından öneriler</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              Kayseri ikliminden cilt tipinize uygun bakım protokollerine, lazer epilasyondan bölgesel inceltmeye uzman içerikler.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 hover:text-rose-600 transition-colors group whitespace-nowrap"
          >
            <span>Tüm Yazılar</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => {
            const img = post.image_url
              ? getImageUrl(post.image_url)
              : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'
            const date = new Date(post.created_at).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {post.category && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-semibold text-lavender-700 uppercase tracking-wider">
                      {post.category}
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {date}
                    </span>
                    {post.reading_time > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} />
                        {post.reading_time} dk okuma
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-lavender-900 mb-2 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 group-hover:text-rose-600 transition-colors">
                    <span>Devamını Oku</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
