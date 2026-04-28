'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import RichEditor from '@/components/admin/RichEditor'

interface ContentItem { id: string; [key: string]: any }

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'html' | 'number' | 'checkbox' | 'image' | 'select' | 'date' | 'array'
  options?: string[]
  required?: boolean
  placeholder?: string
}

interface Props {
  table: string
  title: string
  fields: Field[]
  defaultValues: Record<string, any>
  orderBy?: string
  orderAsc?: boolean
  nameKey?: string
}

export default function AdminCrudPage({ table, title, fields, defaultValues, orderBy = 'sort_order', orderAsc = true, nameKey }: Props) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [editing, setEditing] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = useCallback(async () => {
    const { data } = await supabase.from(table).select('*').order(orderBy, { ascending: orderAsc })
    setItems(data || [])
    setLoading(false)
  }, [table, orderBy, orderAsc])

  useEffect(() => { load() }, [load])

  const handleEdit = (item: ContentItem) => setEditing(JSON.parse(JSON.stringify(item)))
  const handleNew = () => setEditing({ ...defaultValues })
  const updateField = (key: string, value: any) => setEditing((prev: any) => prev ? { ...prev, [key]: value } : null)

  const save = async () => {
    if (!editing || saving) return
    setSaving(true)
    const payload: any = { ...editing }
    delete payload.created_at
    delete payload.updated_at

    try {
      if (editing.id) {
        const { error } = await supabase.from(table).update(payload).eq('id', editing.id)
        if (error) { alert('Hata: ' + error.message); setSaving(false); return }
      } else {
        delete payload.id
        const { error } = await supabase.from(table).insert([payload])
        if (error) { alert('Hata: ' + error.message); setSaving(false); return }
      }
      setEditing(null)
      await load()
    } catch (err: any) {
      alert('Beklenmeyen hata: ' + (err?.message || ''))
    }
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await supabase.from(table).delete().eq('id', id)
    if (editing?.id === id) setEditing(null)
    load()
  }

  const renderField = (field: Field) => {
    if (!editing) return null
    const val = editing[field.key] ?? ''
    switch (field.type) {
      case 'textarea':
        return <textarea className="admin-input" rows={3} value={val} onChange={(e) => updateField(field.key, e.target.value)} placeholder={field.placeholder} />
      case 'html':
        return <RichEditor value={val} onChange={(html) => updateField(field.key, html)} rows={10} placeholder={field.placeholder} />
      case 'number':
        return <input type="number" className="admin-input" value={val} onChange={(e) => updateField(field.key, parseInt(e.target.value) || 0)} />
      case 'checkbox':
        return (
          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" checked={val ?? false} onChange={(e) => updateField(field.key, e.target.checked)} id={`f-${field.key}`} className="w-4 h-4 rounded" />
            <label htmlFor={`f-${field.key}`} className="text-sm">{field.label}</label>
          </div>
        )
      case 'image':
        return <ImageUpload value={val} onChange={(url) => updateField(field.key, url)} />
      case 'select':
        return (
          <select className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value)}>
            <option value="">Seçin</option>
            {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        )
      case 'date':
        return <input type="date" className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value)} />
      case 'array':
        // Comma-separated tags input
        return (
          <input
            className="admin-input"
            value={Array.isArray(val) ? val.join(', ') : (val || '')}
            onChange={(e) => updateField(field.key, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            placeholder={field.placeholder || 'Virgülle ayırın: lazer, cilt bakımı'}
          />
        )
      default:
        return <input className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value)} placeholder={field.placeholder} />
    }
  }

  const dk = nameKey || fields.find(f => f.key === 'name')?.key || fields.find(f => f.key === 'title')?.key || fields.find(f => f.key === 'tab_title')?.key || fields[0]?.key

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-900">{title}</h1>
        <button onClick={handleNew} className="admin-btn admin-btn-primary"><Plus size={18} /> Yeni Ekle</button>
      </div>

      {editing && (
        <div className="admin-card mb-6 border-2 border-purple-200">
          <h2 className="font-bold text-lg mb-4 text-purple-700">{editing.id ? '✏️ Düzenle' : '➕ Yeni Ekle'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {fields.map((field) => (
              <div key={field.key} className={field.type === 'html' || field.type === 'textarea' ? 'md:col-span-2' : ''}>
                {field.type !== 'checkbox' && <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label} {field.required && <span className="text-red-500">*</span>}</label>}
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t">
            <button onClick={save} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={16} /> İptal</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        {loading ? <p className="text-gray-400 py-4">Yükleniyor...</p> : items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Henüz kayıt yok.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Başlık</th><th>Slug</th><th>Durum</th><th>Sıra</th><th>İşlem</th></tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={editing?.id === item.id ? 'bg-purple-50' : ''}>
                  <td>{i + 1}</td>
                  <td className="font-semibold">{item[dk] || '-'}</td>
                  <td className="text-gray-400 text-xs font-mono">{item.slug || '-'}</td>
                  <td>
                    <span className={`admin-badge ${(item.is_active ?? item.is_published ?? true) ? 'admin-badge-green' : 'admin-badge-red'}`}>
                      {(item.is_active ?? item.is_published ?? true) ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td>{item.sort_order ?? '-'}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(item)} className="admin-btn admin-btn-secondary text-xs"><Pencil size={14} /></button>
                      <button onClick={() => remove(item.id)} className="admin-btn admin-btn-danger text-xs"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
