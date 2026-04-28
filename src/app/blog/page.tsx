import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { getImageUrl, SITE_URL } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('blog')
  return {
    title: seo?.meta_title || 'Blog',
    description: seo?.meta_description || 'Güzellik dünyasından yazılar',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/blog` },
  }
}

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const featured = posts?.[0]
  const rest = posts?.slice(1) || []

  return (
    <SiteLayout>
      <PageHeader
        badge="Blog"
        title="Güzellik dünyasından yazılar"
        subtitle="Cilt bakımı, trendler, ipuçları"
        description="Cildinize ve bakımınıza dair uzman tavsiyeleri, güncel trendler ve sizinle paylaşmak istediğimiz ilham veren içerikler."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen size={48} className="text-lavender-300 mx-auto mb-4" />
              <p className="text-gray-500">Henüz blog yazısı yok.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <Image
                      src={featured.image_url ? getImageUrl(featured.image_url) : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80'}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {featured.category && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[11px] font-semibold text-lavender-700 uppercase tracking-wider">
                        {featured.category}
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="text-xs uppercase tracking-wider text-rose-600 font-semibold mb-3">Öne Çıkan</div>
                    <h2 className="text-2xl md:text-4xl font-heading font-medium text-lavender-900 mb-3 leading-tight group-hover:text-rose-600 transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-5">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(featured.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      {featured.reading_time > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} />
                          {featured.reading_time} dk
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 duration-500"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image_url ? getImageUrl(post.image_url) : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {post.category && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[11px] font-semibold text-lavender-700 uppercase tracking-wider">
                            {post.category}
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                          </span>
                          {post.reading_time > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Clock size={12} />
                              {post.reading_time} dk
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg md:text-xl font-heading font-semibold text-lavender-900 mb-2 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                        )}
                        <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 group-hover:text-rose-600 transition-colors">
                          <span>Devamını Oku</span>
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60
