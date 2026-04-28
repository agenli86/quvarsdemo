import { COMPANY } from '@/lib/constants'
import type { SiteSettings } from '@/lib/types'

export default function StickyButtons({ settings }: { settings: SiteSettings }) {
  const wa = settings.whatsapp || COMPANY.whatsapp
  const phone = settings.phone || COMPANY.phone
  const phoneE164 = phone.replace(/\D/g, '').replace(/^0/, '+90')

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${wa}?text=${encodeURIComponent('Merhaba, randevu almak istiyorum.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişim"
        className="group relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg hover:scale-110 transition-all"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8 relative">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-gray-800 text-xs font-medium rounded-lg shadow-soft opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp ile yaz
        </span>
      </a>

      {/* Call */}
      <a
        href={`tel:${phoneE164}`}
        aria-label="Telefon ile ara"
        className="group relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-quvars text-white shadow-soft-lg hover:scale-110 transition-all"
      >
        <span className="absolute inset-0 rounded-full bg-lavender-500 animate-ping opacity-20"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7 relative">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-gray-800 text-xs font-medium rounded-lg shadow-soft opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Hemen ara
        </span>
      </a>
    </div>
  )
}
