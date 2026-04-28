import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Calendar, MessageCircle, Award } from 'lucide-react'
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
    .from('specialists')
    .select('*')
    .eq('slug', params.slug)
    .single()
  if (!data) return { title: 'Uzman bulunamadı' }
  return {
    title: `${data.name}${data.title ? ' - ' + data.title : ''}`,
    description: data.bio?.substring(0, 160) || '',
    alternates: { canonical: `${SITE_URL}/uzmanlar/${data.slug}` },
  }
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('specialists').select('slug').eq('is_active', true)
  return (data || []).map((s) => ({ slug: s.slug }))
}

export default async function SpecialistDetailPage({ params }: Props) {
  const supabase = createClient()
  const { data: s } = await supabase
    .from('specialists')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!s) notFound()

  const img = s.image_url ? getImageUrl(s.image_url) : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80'

  return (
    <SiteLayout>
      <section className="bg-gradient-quvars-soft pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-8 text-lavender-700">
            <Link href="/" className="hover:text-rose-600">Anasayfa</Link>
            <span className="mx-2 text-lavender-400">/</span>
            <Link href="/uzmanlar" className="hover:text-rose-600">Uzmanlar</Link>
            <span className="mx-2 text-lavender-400">/</span>
            <span className="text-lavender-900 font-medium">{s.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft-lg">
                <Image
                  src={img}
                  alt={s.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
                <Award size={12} />
                <span>Uzman Kadro</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-medium text-lavender-900 mb-2">
                {s.name}
              </h1>
              {s.title && (
                <p className="text-xl text-rose-600 italic mb-6">{s.title}</p>
              )}

              {s.specialties && s.specialties.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-lavender-600 mb-3 font-semibold">Uzmanlık Alanları</div>
                  <div className="flex flex-wrap gap-2">
                    {s.specialties.map((sp: string) => (
                      <span key={sp} className="px-4 py-1.5 rounded-full bg-white border border-lavender-200 text-sm text-lavender-800">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {s.bio && (
                <div className="mb-8 text-gray-700 leading-relaxed text-base md:text-lg">
                  {s.bio.split('\n').map((p: string, i: number) => p ? <p key={i} className="mb-4">{p}</p> : null)}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/randevu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all"
                >
                  <Calendar size={16} />
                  <span>Randevu Al</span>
                </Link>
                
                  href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Merhaba, ${s.name} ile randevu almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-lavender-200 text-lavender-800 text-sm font-semibold rounded-full hover:border-lavender-400 transition-all"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
                {s.instagram_url && (
                  
                    href={s.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-lavender-200 text-lavender-800 text-sm font-semibold rounded-full hover:border-lavender-400 transition-all"
                  >
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60
