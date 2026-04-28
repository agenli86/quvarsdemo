import Link from 'next/link'
import { Home, Calendar, Sparkles } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="min-h-[70vh] flex items-center aurora-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Sparkles size={12} />
            <span>404</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-heading font-light text-gradient mb-4">404</h1>
          <h2 className="text-2xl md:text-4xl font-heading font-medium text-lavender-900 mb-3">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Aradığınız sayfa taşınmış veya silinmiş olabilir. Anasayfaya dönerek hizmetlerimize göz atabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all"
            >
              <Home size={16} />
              <span>Anasayfaya Dön</span>
            </Link>
            <Link
              href="/randevu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-lavender-200 text-lavender-800 text-sm font-semibold rounded-full hover:border-lavender-400 transition-all"
            >
              <Calendar size={16} />
              <span>Randevu Al</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
