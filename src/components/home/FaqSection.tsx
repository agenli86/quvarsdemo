import { HelpCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import FaqAccordion from './FaqAccordion'

export default async function FaqSection() {
  const supabase = createClient()
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-gradient-quvars-soft" id="sss">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <HelpCircle size={12} />
            <span>Sıkça Sorulanlar</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Aklınızdaki{' '}
            <span className="text-gradient italic">soruların yanıtları</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            En çok merak edilenleri sizin için derledik.
          </p>
        </div>

        <FaqAccordion items={faqs} />

        {/* FAQPage Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}
