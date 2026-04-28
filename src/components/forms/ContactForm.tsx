'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('contact_submissions').insert([form])
    setLoading(false)
    if (err) {
      setError('Mesajınız gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.')
      return
    }
    setSuccess(true)
    setForm({ name: '', phone: '', email: '', subject: '', message: '' })
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-quvars flex items-center justify-center">
          <CheckCircle size={36} className="text-white" />
        </div>
        <h3 className="text-2xl font-heading font-medium text-lavender-900 mb-3">Mesajınız İletildi!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          En kısa sürede size dönüş yapacağız. Acil durumlar için doğrudan WhatsApp veya telefondan bize ulaşabilirsiniz.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-rose-600 hover:underline"
        >
          Yeni bir mesaj gönder
        </button>
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
            placeholder="Adınız soyadınız"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
            placeholder="0 5__ ___ __ __"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">E-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
            placeholder="email@ornek.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lavender-900 mb-2">Konu</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white"
            placeholder="Mesajınızın konusu"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-lavender-900 mb-2">Mesajınız *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-lavender-200 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 outline-none transition-all bg-white resize-none"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-quvars text-white font-semibold rounded-full shadow-soft hover:shadow-glow transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        <span>{loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
      </button>
    </form>
  )
}
