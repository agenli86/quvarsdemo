import Image from 'next/image'
import { Instagram, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/constants'
import { getSettings } from '@/lib/settings'

export default async function InstagramFeed() {
  const supabase = createClient()
  const settings = await getSettings()
  const igHandle = settings.instagram?.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '') || 'quvarsbeauty'

  const { data: posts } = await supabase
    .from('instagram_posts')
    .select('*')
    .eq('is_active', true)
    .order('posted_at', { ascending: false, nullsFirst: false })
    .order('sort_order', { ascending: true })
    .limit(6)

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Instagram size={12} />
            <span>Instagram Akışı</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Bizi Instagram'da{' '}
            <span className="text-gradient italic">takip edin</span>
          </h2>
          <a
            href={settings.instagram || `https://instagram.com/${igHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-lavender-700 hover:text-rose-600 font-semibold transition-colors"
          >
            <Instagram size={18} />
            <span>@{igHandle}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {posts.map((p) => (
            <a
              key={p.id}
              href={p.permalink || settings.instagram || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-lavender-100"
            >
              <Image
                src={getImageUrl(p.image_url)}
                alt={p.caption || 'Instagram post'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/90 via-lavender-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                <Instagram size={20} className="text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
