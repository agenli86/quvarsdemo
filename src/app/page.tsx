import { createClient } from '@/lib/supabase/server'
import VideoHero from '@/components/home/VideoHero'
import WelcomeSection from '@/components/home/WelcomeSection'
import ServicesSection from '@/components/home/ServicesSection'
import StatsBanner from '@/components/home/StatsBanner'
import SpecialistsSection from '@/components/home/SpecialistsSection'
import CampaignBanner from '@/components/home/CampaignBanner'
import GallerySection from '@/components/home/GallerySection'
import BlogSection from '@/components/home/BlogSection'
import TestimonialsMarquee from '@/components/home/TestimonialsMarquee'
import InstagramFeed from '@/components/home/InstagramFeed'
import FaqSection from '@/components/home/FaqSection'
import MapSection from '@/components/home/MapSection'
import { getSettings } from '@/lib/settings'

export default async function HomePage() {
  const settings = await getSettings()

  return (
    <SiteLayout>
      <VideoHero
        videoUrl={settings.hero_video_url || undefined}
        posterUrl={settings.hero_poster_url || undefined}
        logoUrl={settings.logo_url || undefined}
      />
      <WelcomeSection />
      <ServicesSection />
      <StatsBanner />
      <SpecialistsSection />
      <CampaignBanner />
      <GallerySection />
      <TestimonialsMarquee />
      <BlogSection />
      <InstagramFeed />
      <FaqSection />
      <MapSection settings={settings} />
    </SiteLayout>
  )
}

export const revalidate = 60
