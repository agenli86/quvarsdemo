import Link from 'next/link'
import Image from 'next/image'
import { Instagram, ArrowUpRight, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/constants'

export default async function SpecialistsSection() {
  const supabase = createClient()
  const { data: specialists } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(4)

  // Eğer henüz uzman eklenmemişse, demo placeholder göster
  const items = (specialists && specialists.length > 0) ? specialists : [
    { id: '1', name: 'Uzman ekibimizi tanıyın', slug: '#', title: 'Yakında', bio: '', image_url: null, instagram_url: null, specialties: [] },
  ]

  if (!specialists || specialists.length === 0) {
    return null // Veri yoksa bölümü gösterme; admin ekleyince otomatik gelir
  }

  const defaultAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80'

  return (
    <section className="py-20 md:py-28 relative" id="uzmanlar">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
              <Users size={12} />
              <span>Uzmanlarımız</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
              Bakımınız{' '}
              <span className="text-gradient italic">emin ellerde</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              Sertifikalı, eğitimli ve deneyimli kadromuz size en iyi sonuçları sunmak için burada.
            </p>
          </div>
          <Link
            href="/uzmanlar"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 hover:text-rose-600 transition-colors group whitespace-nowrap"
          >
            <span>Tüm Uzmanlar</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((s: any) => (
            <Link
              key={s.id}
              href={s.slug !== '#' ? `/uzmanlar/${s.slug}` : '#'}
              className="group relative overflow-hidden rounded-3xl bg-lavender-100 aspect-[3/4] block"
            >
              <Image
                src={s.image_url ? getImageUrl(s.image_url) : defaultAvatar}
                alt={s.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/95 via-lavender-900/30 to-transparent" />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                  {s.name}
                </h3>
                {s.title && (
                  <p className="text-sm text-rose-200 italic mb-2">{s.title}</p>
                )}
                {s.specialties && s.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.specialties.slice(0, 2).map((sp: string) => (
                      <span key={sp} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 border border-white/20">
                        {sp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Top instagram */}
              {s.instagram_url && (
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-dark border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram size={16} className="text-white" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
