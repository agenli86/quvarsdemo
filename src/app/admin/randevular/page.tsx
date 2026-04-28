'use client'

import { useEffect, useState } from 'react'
import { ClipboardList, Phone, Mail, Calendar, Clock, MessageSquare, Trash2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Request {
  id: string
  name: string
  phone: string
  email: string | null
  service: string | null
  preferred_date: string | null
  preferred_time: string | null
  message: string | null
  is_read: boolean
  is_handled: boolean
  created_at: string
}

export default function RandevularAdmin() {
  const [items, setItems] = useState<Request[]>([])
  const [selected, setSelected] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase
      .from('appointment_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await supabase.from('appointment_requests').update({ is_read: true }).eq('id', id)
    load()
  }

  const toggleHandled = async (id: string, current: boolean) => {
    await supabase.from('appointment_requests').update({ is_handled: !current }).eq('id', id)
    load()
    if (selected?.id === id) setSelected({ ...selected, is_handled: !current })
  }

  const remove = async (id: string) => {
    if (!confirm('Bu randevu talebini silmek istediğinize emin misiniz?')) return
    await supabase.from('appointment_requests').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    load()
  }

  const handleSelect = (item: Request) => {
    setSelected(item)
    if (!item.is_read) markRead(item.id)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
        <ClipboardList size={24} /> Randevu Talepleri
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 admin-card max-h-[80vh] overflow-y-auto">
          {loading ? (
            <p className="text-gray-400">Yükleniyor...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Henüz randevu talebi yok.</p>
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
                    {item.is_handled && <span className="admin-badge admin-badge-green text-[9px]">✓</span>}
                  </div>
                  <div className="text-xs text-gray-500">{item.phone}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(item.created_at).toLocaleString('tr-TR')}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="admin-card">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-purple-900">{selected.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(selected.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleHandled(selected.id, selected.is_handled)}
                    className={`admin-btn ${selected.is_handled ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                  >
                    <CheckCircle2 size={16} />
                    {selected.is_handled ? 'İşlem Geri Al' : 'İşleme Alındı'}
                  </button>
                  <button onClick={() => remove(selected.id)} className="admin-btn admin-btn-danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <Phone size={18} className="text-purple-600" />
                  <span className="font-semibold text-purple-900">{selected.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <MessageSquare size={18} className="text-green-600" />
                  <span className="font-semibold text-green-900">WhatsApp ile Yaz</span>
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 col-span-2">
                    <Mail size={18} className="text-blue-600" />
                    <span className="font-semibold text-blue-900">{selected.email}</span>
                  </a>
                )}
              </div>

              <div className="space-y-3 text-sm">
                {selected.service && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">İstenen Hizmet</span>
                    <span className="font-semibold">{selected.service}</span>
                  </div>
                )}
                {selected.preferred_date && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 inline-flex items-center gap-1"><Calendar size={14} /> Tercih edilen tarih</span>
                    <span className="font-semibold">{selected.preferred_date}</span>
                  </div>
                )}
                {selected.preferred_time && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 inline-flex items-center gap-1"><Clock size={14} /> Tercih edilen saat</span>
                    <span className="font-semibold">{selected.preferred_time}</span>
                  </div>
                )}
                {selected.message && (
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Not</div>
                    <p className="bg-gray-50 p-4 rounded-lg leading-relaxed">{selected.message}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-card text-center py-12 text-gray-400">
              <ClipboardList size={48} className="mx-auto mb-3 opacity-30" />
              <p>Bir randevu talebi seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
