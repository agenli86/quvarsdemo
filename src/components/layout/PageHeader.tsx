import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  breadcrumbs?: Crumb[]
  bgImage?: string
  align?: 'left' | 'center'
}

export default function PageHeader({
  title,
  subtitle,
  description,
  badge,
  breadcrumbs = [],
  bgImage,
  align = 'center',
}: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <section className="relative overflow-hidden bg-gradient-quvars-soft">
      {/* Background image with overlay */}
      {bgImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-lavender-900/85 via-lavender-900/70 to-lavender-900/90" />
          <div className="absolute inset-0 noise-overlay" />
        </>
      ) : (
        <>
          {/* Aurora-soft background */}
          <div className="absolute top-0 left-0 w-[60vw] h-[60vw] rounded-full bg-lavender-300/30 blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full bg-rose-300/20 blur-3xl translate-x-1/3 translate-y-1/3" />
        </>
      )}

      <div className="relative container mx-auto px-4 py-20 md:py-28 z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className={`flex items-center gap-1 text-xs md:text-sm mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
            <Link href="/" className={`inline-flex items-center gap-1 ${bgImage ? 'text-white/70 hover:text-white' : 'text-lavender-700 hover:text-rose-600'} transition-colors`}>
              <Home size={12} />
              <span>Anasayfa</span>
            </Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight size={12} className={bgImage ? 'text-white/40' : 'text-lavender-400'} />
                {c.href ? (
                  <Link href={c.href} className={`${bgImage ? 'text-white/70 hover:text-white' : 'text-lavender-700 hover:text-rose-600'} transition-colors`}>
                    {c.label}
                  </Link>
                ) : (
                  <span className={bgImage ? 'text-white' : 'text-lavender-900 font-medium'}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`max-w-3xl ${alignCls}`}>
          {badge && (
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full text-xs font-medium uppercase tracking-wider ${
              bgImage
                ? 'glass-dark border border-white/20 text-white/90'
                : 'bg-white/80 backdrop-blur text-lavender-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{badge}</span>
            </div>
          )}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-light leading-[1.1] mb-4 ${
            bgImage ? 'text-white' : 'text-lavender-900'
          }`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`italic text-lg md:text-xl mb-3 ${bgImage ? 'text-rose-200' : 'text-lavender-600'}`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`text-base md:text-lg leading-relaxed ${
              bgImage ? 'text-white/80' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
