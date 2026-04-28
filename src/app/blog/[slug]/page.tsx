import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getImageUrl, SITE_URL, COMPANY } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Yazı bulunamadı' }

  return {
    title: data.title,
    description: data.meta_description || data.excerpt || '',
    alternates: { canonical: `${SITE_URL}/blog/${data.slug}` },
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.meta_description || data.excerpt || '',
      images: data.image_url ? [getImageUrl(data.image_url)] : [],
      publishedTime: data.published_at || data.created_at,
    },
  }
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('blog_posts').select('slug').eq('is_published', true)
  return (data || []).map((b) => ({ slug: b.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  const { data: related } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, image_url, category, created_at, reading_time')
    .eq('is_published', true)
    .neq('id', post.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const heroImg = post.image_url ? getImageUrl(post.image_url) : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80'
  const date = new Date(post.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] md:min-h-[520px] overflow-hidden bg-lavender-900">
        <Image
          src={heroImg}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lavender-900 via-lavender-900/70 to-lavender-900/50" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative h-full flex flex-col justify-end container mx-auto px-4 pb-12 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            <span>Blog'a Dön</span>
          </Link>

          {post.category && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass-dark rounded-full text-xs font-semibold text-white uppercase tracking-wider w-fit border border-white/20">
              <Tag size={12} className="text-rose-300" />
              <span>{post.category}</span>
            </div>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-light text-white max-w-4xl leading-[1.1] mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} />
              {date}
            </span>
            {post.reading_time > 0 && (
              <span className="inline-flex items-center gap-2">
                <Clock size={14} />
                {post.reading_time} dk okuma
              </span>
            )}
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-lavender-700 italic leading-relaxed mb-10 pb-8 border-b border-lavender-100">
              {post.excerpt}
            </p>
          )}

          {post.content ? (
            <div
              className="prose-quvars text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-gray-500 italic">İçerik henüz hazırlanıyor.</p>
          )}

          <div className="mt-16 p-8 rounded-3xl bg-gradient-quvars-soft text-center">
            <h3 className="text-2xl font-heading font-medium text-lavender-900 mb-3">
              Beğendiniz mi? Bizi takip edin
            </h3>
            <p className="text-gray-600 mb-5">İlham veren içerikler için Instagram'da bize katılın.</p>
            <Link
              href="/randevu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </article>

      {related && related.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-quvars-soft">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-8 text-center">
              İlgili Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image_url ? getImageUrl(r.image_url) : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-lavender-900 group-hover:text-rose-600 line-clamp-2 transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: heroImg,
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at,
            author: { '@type': 'Organization', name: COMPANY.name },
            publisher: {
              '@type': 'Organization',
              name: COMPANY.name,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
          }),
        }}
      />
    </SiteLayout>
  )
}

export const revalidate = 60
