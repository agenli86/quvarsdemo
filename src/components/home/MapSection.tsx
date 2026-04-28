import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import type { SiteSettings } from '@/lib/types'

export default function MapSection({ settings }: { settings: SiteSettings }) {
  const address = settings.address || COMPANY.address
  const phone = settings.phone || COMPANY.phone
  const email = settings.email || COMPANY.email
  const hours = settings.working_hours || COMPANY.workingHours

  // Daima bu çalışan formatı kullan — embed kodu yapıştırma sorunlarını engeller
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="relative" id="iletisim">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <MapPin size={12} />
            <span>Bize Ulaşın</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Kayseri Kocasinan'da{' '}
            <span className="text-gradient italic">ziyaretinizi bekliyoruz</span>
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-soft-lg bg-lavender-100">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title={`${COMPANY.name} konumu`}
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md p-6 md:p-8 glass rounded-2xl shadow-soft-lg">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-lavender-900 mb-4">
              {COMPANY.name}
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-rose-500 mt-1 flex-shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-rose-500 flex-shrink-0" />
                <a href={`tel:${COMPANY.phoneE164}`} className="hover:text-lavender-700 font-medium">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-rose-500 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-lavender-700">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-rose-500 mt-1 flex-shrink-0" />
                <span>{hours}</span>
              </li>
            </ul>
            <a
              href={`https://maps.google.com/maps?daddr=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all"
            >
              <Navigation size={14} />
              <span>Yol Tarifi Al</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
