'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, MessageSquare, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Submission {
  id: string
  name: string
  phone: string | null
  email: string | null
  subject: string | null
  message: string | null
  is_read: boolean
  created_at: string
}

export default function IletisimFormlariAdmin() {
  const [items, setItems] = useState<Submission[]>([])
  const [selected, setSelected] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ is_read: true }).eq('id', id)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    load()
  }

  const handleSelect = (item: Submission) => {
    setSelected(item)
    if (!item.is_read) markRead(item.id)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
        <Mail size={24} /> İletişim Formları
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 admin-card max-h-[80vh] overflow-y-auto">
          {loading ? (
            <p className="text-gray-400">Yükleniyor...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Henüz mesaj yok.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selected?.id === item.id
                      ? 'bg-purple-100 border-2 border-purple-400'
                      : item.is_read
                      ? 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      : 'bg-pink-50 border border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className={`font-bold ${item.is_read ? 'text-gray-700' : 'text-pink-700'}`}>
                      {item.name}
                    </span>
                    {!item.is_read && <span className="admin-badge admin-badge-red text-[9px]">YENİ</span>}
                  </div>
                  {item.subject && <div className="text-xs text-gray-600 mb-1">{item.subject}</div>}
                  <div className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString('tr-TR')}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="admin-card">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-purple-900">{selected.name}</h2>
                  {selected.subject && <p className="text-purple-600 italic">{selected.subject}</p>}
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(selected.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                <button onClick={() => remove(selected.id)} className="admin-btn admin-btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100">
                    <Phone size={18} className="text-purple-600" />
                    <span className="font-semibold text-purple-900">{selected.phone}</span>
                  </a>
                )}
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100"
                  >
                    <MessageSquare size={18} className="text-green-600" />
                    <span className="font-semibold text-green-900">WhatsApp</span>
                  </a>
                )}
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 col-span-2">
                    <Mail size={18} className="text-blue-600" />
                    <span className="font-semibold text-blue-900">{selected.email}</span>
                  </a>
                )}
              </div>

              {selected.message && (
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Mesaj</div>
                  <p className="bg-gray-50 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="admin-card text-center py-12 text-gray-400">
              <Mail size={48} className="mx-auto mb-3 opacity-30" />
              <p>Bir mesaj seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
