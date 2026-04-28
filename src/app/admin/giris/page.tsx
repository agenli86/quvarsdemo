'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, Lock, Mail, LogIn, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-posta veya şifre yanlış.')
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #3E2D66 0%, #553F8A 50%, #A2375C 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-4">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Quvars Admin</h1>
          <p className="text-white/60 text-sm">Yönetim paneline giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-purple-900 mb-2">E-posta</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input pl-10"
                placeholder="admin@admin.com"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-purple-900 mb-2">Şifre</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full admin-btn admin-btn-primary justify-center disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            <span>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</span>
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-white/60 hover:text-white text-sm">← Siteye geri dön</a>
        </div>
      </div>
    </div>
  )
}
