export const SITE_NAME = 'Quvars Beauty Studio'
export const SITE_TAGLINE = 'Kayseri Lazer Epilasyon, Cilt Bakımı & Bölgesel İncelme'
export const SITE_DOMAIN = 'quvarsbeauty.com'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`

export const SUPABASE_IMG_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/img`

export function getImageUrl(path: string | null | undefined, fallback?: string): string {
  if (!path) {
    return fallback || 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80'
  }
  if (path.startsWith('http')) return path
  return `${SUPABASE_IMG_URL}/${path}`
}

export const COMPANY = {
  name: 'Quvars Beauty Studio',
  legalName: 'Quvars Güzellik Merkezi',
  city: 'Kayseri',
  district: 'Kocasinan',
  address: 'Erciyesevler, Sivas Caddesi Bulvarı 229/A, 38110 Kocasinan/Kayseri',
  phone: '0541 118 63 38',
  phoneE164: '+905411186338',
  whatsapp: '905411186338',
  email: 'info@quvarsbeauty.com',
  workingHours: 'Pzt-Cmt: 10:00 - 20:00',
  googleReviewLink: 'https://share.google/0XObGomjIAtBtIcvp',
  rating: 4.8,
  reviewCount: 91,
}

export const NAV_LINKS = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Uzmanlar', href: '/uzmanlar' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
] as const

export const ICON_OPTIONS = [
  'sparkles', 'flower', 'heart', 'star', 'eye', 'sun', 'moon', 'gem',
  'crown', 'wand-2', 'palette', 'scissors', 'spray-can', 'leaf', 'feather',
  'droplets', 'flame', 'zap'
]
