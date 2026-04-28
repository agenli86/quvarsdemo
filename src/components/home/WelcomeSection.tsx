import { createClient } from '@/lib/supabase/server'
import { Sparkles, ShieldCheck, Award, Heart } from 'lucide-react'

export default async function WelcomeSection() {
  const supabase = createClient()
  const { data } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('section_key', 'welcome')
    .single()

  const features = [
    { icon: Award, label: 'Sertifikalı Kadro', desc: 'Kayseri\'nin alanında uzman, eğitimli güzellik profesyonelleri' },
    { icon: ShieldCheck, label: 'Hijyen & Güven', desc: 'Tek kullanımlık ekipman, hastane standartlarında sterilizasyon' },
    { icon: Sparkles, label: 'Modern Cihazlar', desc: 'FDA onaylı son teknoloji ile etkili ve kalıcı sonuçlar' },
    { icon: Heart, label: 'Kişiye Özel', desc: 'Cilt tipinize uygun özelleştirilmiş bakım protokolleri' },
  ]

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Hoş Geldiniz · Kocasinan / Kayseri</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 mb-5 leading-tight">
            {data?.title || 'Kayseri\'nin Güvenilir Güzellik Adresi'}
          </h2>
          {data?.subtitle && (
            <p className="text-lavender-600 italic mb-4 text-lg">{data.subtitle}</p>
          )}
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {data?.content ||
              'Quvars Beauty Studio olarak Kayseri Kocasinan\'da, lazer epilasyon ve cilt bakımından bölgesel inceltmeye kadar geniş hizmet yelpazemizle güzellik yolculuğunuzda yanınızdayız. Modern teknoloji, samimi atmosfer ve uzman kadromuzla bakımınızı emin ellere bırakabilirsiniz.'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.label}
                className="group relative p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-lavender-100 hover:border-lavender-300 hover:shadow-soft-lg transition-all hover:-translate-y-2 duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-quvars-soft flex items-center justify-center group-hover:bg-gradient-quvars transition-all duration-500">
                  <Icon size={26} className="text-lavender-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-heading font-semibold text-lavender-900 mb-1.5">
                  {f.label}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
