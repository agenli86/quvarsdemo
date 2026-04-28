import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient()

  const [
    { data: services },
    { data: specialists },
    { data: blogPosts },
  ] = await Promise.all([
    supabase.from('services').select('slug, updated_at').eq('is_active', true),
    supabase.from('specialists').select('slug, updated_at').eq('is_active', true),
    supabase.from('blog_posts').select('slug, updated_at').eq('is_published', true),
  ])

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/hizmetler`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/uzmanlar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/galeri`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/randevu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const servicePages = (services || []).map((s) => ({
    url: `${SITE_URL}/hizmetler/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const specialistPages = (specialists || []).map((s) => ({
    url: `${SITE_URL}/uzmanlar/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const blogPages = (blogPosts || []).map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...specialistPages, ...blogPages]
}
