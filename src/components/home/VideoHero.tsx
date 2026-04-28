'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Sparkles, Star, ChevronDown, Play } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

interface Props {
  videoUrl?: string
  posterUrl?: string
  logoUrl?: string
  title?: string
  subtitle?: string
}

export default function VideoHero({
  videoUrl,
  posterUrl,
  logoUrl,
  title,
  subtitle,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Yedek video listesi — admin panelden değiştirilemediyse / başarısız olduysa otomatik geçer
  // Hepsi makyaj / güzellik salonu temalı, royalty-free Pexels videoları
  const candidateVideos = [
    videoUrl,
    // 1. Makyaj uygulanması (yakın çekim, profesyonel)
    'https://videos.pexels.com/video-files/7291772/7291772-uhd_2560_1440_25fps.mp4',
    // 2. Güzellik salonu atmosferi
    'https://videos.pexels.com/video-files/7754397/7754397-uhd_2560_1440_25fps.mp4',
    // 3. Spa / cilt bakımı (önceden çalışan default)
    'https://videos.pexels.com/video-files/4534126/4534126-uhd_2560_1440_25fps.mp4',
  ].filter(Boolean) as string[]

  const [videoIndex, setVideoIndex] = useState(0)
  const finalVideo = candidateVideos[videoIndex]
  const finalPoster = posterUrl || 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80'

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setLoaded(true)
    const onError = () => {
      if (videoIndex < candidateVideos.length - 1) {
        setVideoIndex((i) => i + 1)
        setLoaded(false)
      } else {
        setVideoFailed(true)
      }
    }
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('error', onError)
    return () => {
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('error', onError)
    }
  }, [videoIndex, candidateVideos.length])

  return (
    <section className="relative w-full overflow-hidden bg-lavender-900 min-h-[100svh] flex flex-col">
      {/* Background video — sessiz, Royal Derm tarzı */}
      {!videoFailed && (
        <video
          ref={videoRef}
          key={finalVideo}
          autoPlay
          muted /* her zaman sessiz — ses kontrolü yok */
          loop
          playsInline
          poster={finalPoster}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          preload="metadata"
        >
          <source src={finalVideo} type="video/mp4" />
        </video>
      )}

      {/* Poster fallback */}
      {(!loaded || videoFailed) && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${finalPoster})` }}
        />
      )}

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-900/75 via-lavender-900/55 to-lavender-900/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-lavender-900/60 via-transparent to-rose-900/40" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-lavender-200 rounded-full animate-float opacity-70" />
        <div className="absolute top-1/3 right-[20%] w-3 h-3 bg-rose-300 rounded-full animate-float-slow opacity-50" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[25%] w-2 h-2 bg-lilac-300 rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[35%] w-1.5 h-1.5 bg-lavender-300 rounded-full animate-pulse-soft" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center pt-24 pb-16 md:pt-28 md:pb-20">
        {/* Logo card */}
        <div className="mb-6 md:mb-8 animate-scale-in">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full bg-gradient-quvars opacity-50 blur-2xl animate-pulse-soft" />
            <div className="absolute inset-0 rounded-full border border-white/30 animate-spin" style={{ animationDuration: '40s' }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-rose-300 rounded-full" />
            </div>
            <div className="absolute inset-3 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
            <div className="absolute inset-6 rounded-full glass shadow-glow flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={COMPANY.name}
                  fill
                  className="object-contain p-3"
                  sizes="160px"
                  priority
                />
              ) : (
                <div className="text-center">
                  <Sparkles className="text-white mx-auto mb-1" size={24} />
                  <div className="text-white font-heading text-base font-medium">Quvars</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass-dark rounded-full text-[11px] sm:text-xs font-medium text-white/90 animate-fade-up">
          <Sparkles size={12} className="text-rose-300" />
          <span className="tracking-wider uppercase">Kayseri Güzellik Merkezi · Kocasinan</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-light text-white leading-[1.1] mb-4 md:mb-5 max-w-4xl px-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {title || (
            <>
              Güzelliğinizi
              <br />
              <span className="font-medium italic bg-gradient-to-r from-lavender-200 via-lilac-200 to-rose-200 bg-clip-text text-transparent">
                yeniden keşfedin
              </span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-5 md:mb-7 px-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {subtitle || 'Kayseri\'nin güvenilir güzellik merkezi Quvars Beauty Studio\'da lazer epilasyon, cilt bakımı, bölgesel incelme ve nail art hizmetleri uzman ekibimizle sizi bekliyor.'}
        </p>

        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 animate-fade-up text-sm" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-rose-300 text-rose-300" />
            ))}
          </div>
          <span className="text-white font-semibold">4.8</span>
          <span className="text-white/40">·</span>
          <span className="text-white/80">{COMPANY.reviewCount} Google yorumu</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md sm:max-w-none px-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/randevu"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 md:py-4 bg-gradient-quvars text-white text-sm md:text-base font-semibold rounded-full shadow-soft-lg hover:shadow-glow transition-all btn-glow w-full sm:w-auto"
          >
            <Calendar size={16} />
            <span>Hemen Randevu Al</span>
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 md:py-4 glass-dark text-white text-sm md:text-base font-semibold rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <Play size={14} />
            <span>Hizmetlerimizi Keşfet</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator — hoparlör butonu kaldırıldı */}
      <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/60 animate-pulse-soft pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em]">Aşağı Kaydır</span>
        <ChevronDown size={16} />
      </div>
    </section>
  )
}
