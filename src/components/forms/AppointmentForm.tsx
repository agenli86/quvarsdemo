'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, CheckCircle, Loader2, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { COMPANY } from '@/lib/constants'

interface ServiceOption {
  slug: string
  name: string
}

export default function AppointmentForm({ services }: { services: ServiceOption[] }) {
  const searchParams = useSearchParams()
  const preselected = searchParams?.get('hizmet') || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselected,
    preferred_date: '',
    preferred_time: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, service: preselected }))
  }, [preselected])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const payload = {
      ...form,
      preferred_date: form.preferred_date || null,
    }
    const { error: err } = await supabase.from('appointment_requests').insert([payload])
    setLoading(false)
    if (err) {
      setError('Randevu talebi gönderilemedi. Lütfen WhatsApp veya telefondan bizi arayın.')
      return
    }
    setSuccess(true)
  }

  const openWhatsApp = () => {
    const txt = `Merhaba, randevu talep ediyorum.

Ad Soyad: ${form.name}
Telefon: ${form.phone}
${form.service ? 'Hizmet: ' + (services.find(s => s.slug === form.service)?.name || form.service) : ''}
${form.preferred_date ? 'Tarih: ' + form.preferred_date : ''}
${form.preferred_time ? 'Saat: ' + form.preferred_time : ''}
${form.message ? 'Not: ' + form.message : ''}`
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(txt)}`, '_blank')
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-quvars flex items-center justify-center">
          <CheckCircle size={36} className="text-white" />
        </div>
        <h3 className="text-2xl font-heading font-medium text-lavender-900 mb-3">Randevu Talebiniz İletildi!</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          En kısa sürede arayarak randevunuzu kesinleştireceğiz. Acil durumlarda WhatsApp veya telefondan ulaşabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold"
          >
            <MessageCircle size={16} />
            WhatsApp ile Yaz
          </a>
          <a
            href={`tel:${COMPANY.phoneE164}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-lavender-200 text-lavender-800 rounded-full font-semibold"
          >
            {COMPANY.phone}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Adınız Soyadınız *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Telefon *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0 5__ ___ __ __"
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-lavender-900 mb-2">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-lavender-900 mb-2">Hizmet</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          >
            <option value="">Hizmet seçin (opsiyonel)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Tercih ettiğiniz tarih</label>
          <input
            type="date"
            value={form.preferred_date}
            onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Tercih ettiğiniz saat</label>
          <select
            value={form.preferred_time}
            onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
          >
            <option value="">Saat seçin</option>
            <option>10:00 - 12:00</option>
            <option>12:00 - 14:00</option>
            <option>14:00 - 16:00</option>
            <option>16:00 - 18:00</option>
            <option>18:00 - 20:00</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-lavender-900 mb-2">Notunuz</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white resize-none"
          placeholder="Eklemek istediğiniz bir not var mı?"
        />
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-quvars text-white font-semibold rounded-full shadow-soft hover:shadow-glow transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Calendar size={18} />}
          <span>{loading ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}</span>
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white font-semibold rounded-full shadow-soft hover:opacity-90 transition-all"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </button>
      </div>
    </form>
  )
}
