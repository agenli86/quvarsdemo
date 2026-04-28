import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import type { SiteSettings } from '@/lib/types'

export default function Footer({ settings }: { settings: SiteSettings }) {
  // Footer'da farklı (beyaz/lighter) logo kullanılabilsin diye logo_footer_url
  const footerLogo = settings.logo_footer_url || settings.logo_url

  return (
    <footer className="relative mt-20 bg-gradient-quvars-dark text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-lavender-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/30 bg-white/10">
                {footerLogo ? (
                  <Image src={footerLogo} alt={COMPANY.name} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-2xl font-heading font-semibold">Quvars</div>
                <div className="text-[10px] tracking-[0.25em] text-lavender-200 uppercase -mt-1">
                  Beauty Studio
                </div>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {settings.footer_about_text ||
                'Kayseri\'nin merkezinde lazer epilasyon, cilt bakımı ve nail art alanlarında uzman kadrosuyla hizmet veren güzellik merkezi.'}
            </p>
            <div className="flex gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="Youtube"
                >
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-lavender-200">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services teaser */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-lavender-200">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/hizmetler/lazer-epilasyon" className="hover:text-white">Lazer Epilasyon</Link></li>
              <li><Link href="/hizmetler/cilt-bakimi" className="hover:text-white">Cilt Bakımı</Link></li>
              <li><Link href="/hizmetler/bolgesel-incelme" className="hover:text-white">Bölgesel İncelme</Link></li>
              <li><Link href="/hizmetler/nail-art" className="hover:text-white">Nail Art & Protez Tırnak</Link></li>
              <li><Link href="/hizmetler/kas-kirpik" className="hover:text-white">Kaş & Kirpik</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-lavender-200">
              İletişim
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-lavender-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{settings.address || COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-lavender-300 flex-shrink-0" />
                <a href={`tel:${COMPANY.phoneE164}`} className="text-white/80 hover:text-white">
                  {settings.phone || COMPANY.phone}
                </a>
              </li>
              {settings.email && (
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-lavender-300 flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-white/80 hover:text-white">
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-lavender-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{settings.working_hours || COMPANY.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>{settings.footer_copyright || `© ${new Date().getFullYear()} ${COMPANY.name}. Tüm hakları saklıdır.`}</div>
          <div className="flex items-center gap-1">
            <span>Tasarım & Geliştirme:</span>
            <span className="text-lavender-200 font-medium">Musa Web Studio</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
