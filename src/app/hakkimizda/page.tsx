import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Heart, Shield, Star, Sparkles, Calendar } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { SITE_URL, COMPANY } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('hakkimizda')
  return {
    title: seo?.meta_title || 'Hakkımızda',
    description: seo?.meta_description || '',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/hakkimizda` },
  }
}

export default async function AboutPage() {
  const supabase = createClient()
  const { data: about } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('section_key', 'hakkimizda')
    .single()

  const values = [
    { icon: Award, title: 'Profesyonellik', desc: 'Sertifikalı, eğitimli ve sürekli kendini geliştiren bir kadro' },
    { icon: Shield, title: 'Hijyen ve Güven', desc: 'Tek kullanımlık ekipman, sterilizasyon ve titiz uygulama protokolleri' },
    { icon: Heart, title: 'Müşteri Odaklılık', desc: 'Her müşterimiz için özelleştirilmiş bakım planları ve içten ilgi' },
    { icon: Sparkles, title: 'Modern Teknoloji', desc: 'Son nesil cihazlar ve güncel uygulama teknikleri' },
  ]

  return (
    <SiteLayout>
      <PageHeader
        badge="Hakkımızda"
        title={about?.title || 'Bizi tanıyın'}
        subtitle={about?.subtitle || "Kayseri'nin gözde güzellik adresi"}
        breadcrumbs={[{ label: 'Hakkımızda' }]}
        bgImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg">
              <Image
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80"
                alt="Quvars Beauty Studio iç mekan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-rose-600 font-semibold mb-3">Hikayemiz</div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium text-lavender-900 mb-6 leading-tight">
                Güzelliğinize <span className="text-gradient italic">ilham olmak</span> için buradayız
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {about?.content ? (
                  about.content.split('\n').filter(Boolean).map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <>
                    <p>Quvars Beauty Studio, Kayseri Kocasinan'ın merkezinde sertifikalı uzman kadromuz ile 5 yılı aşkın süredir hizmet veren bir güzellik merkezidir.</p>
                    <p>Lazer epilasyon, cilt bakımı, bölgesel incelme ve nail art alanlarında modern cihazlarımız ve kişiye özel bakım protokollerimizle bakımınızı emin ellere bırakabilirsiniz.</p>
                    <p>Hijyen, samimiyet ve profesyonellik bizim için vazgeçilmez. Her ziyaretinizde özel hissetmenizi istiyoruz.</p>
                  </>
                )}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { num: '5+', label: 'Yıl Tecrübe' },
                  { num: '2.000+', label: 'Mutlu Müşteri' },
                  { num: '4.8', label: 'Google Puanı' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-2xl bg-lavender-50">
                    <div className="text-2xl font-heading font-semibold text-gradient">{s.num}</div>
                    <div className="text-xs text-gray-600 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-quvars-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-lavender-900 mb-4 leading-tight">
              Değerlerimiz
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Bizi biz yapan ilkelerimiz; her müşterimize en iyi deneyimi sunmak için sarıldığımız değerler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="p-6 md:p-8 bg-white rounded-3xl shadow-soft border border-lavender-100">
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-quvars-soft flex items-center justify-center">
                    <Icon size={26} className="text-lavender-600" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-lavender-900 mb-4">
            Sizi bekliyoruz
          </h2>
          <p className="text-gray-600 mb-8 text-base md:text-lg">
            Bakımınız ve güzelliğiniz için bizi tercih edebilirsiniz. Randevu için bir adım uzaktasınız.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/randevu"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft-lg hover:shadow-glow transition-all"
            >
              <Calendar size={16} />
              <span>Randevu Al</span>
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white border border-lavender-200 text-lavender-800 text-sm font-semibold rounded-full hover:border-lavender-400 transition-all"
            >
              <span>İletişime Geç</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60
