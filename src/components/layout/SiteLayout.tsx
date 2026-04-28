import Header from './Header'
import Footer from './Footer'
import StickyButtons from './StickyButtons'
import Topbar from './Topbar'
import { getSettings } from '@/lib/settings'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <>
      {settings.topbar_active === 'true' && <Topbar text={settings.topbar_text} />}
      <Header settings={settings} />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
      <StickyButtons settings={settings} />
      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': settings.homepage_schema_type || 'BeautySalon',
            name: settings.site_title || 'Quvars Beauty Studio',
            description: settings.site_description,
            telephone: settings.phone,
            email: settings.email,
            url: process.env.NEXT_PUBLIC_SITE_URL,
            image: settings.logo_url || settings.og_image,
            address: {
              '@type': 'PostalAddress',
              streetAddress: settings.address,
              addressLocality: 'Kayseri',
              addressRegion: 'Kocasinan',
              postalCode: '38110',
              addressCountry: 'TR',
            },
            openingHours: settings.working_hours,
            sameAs: [settings.facebook, settings.instagram, settings.tiktok, settings.youtube].filter(Boolean),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '91',
            },
          }),
        }}
      />
    </>
  )
}
