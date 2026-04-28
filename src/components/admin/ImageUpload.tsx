'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage.from('img').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) {
      alert('Yükleme hatası: ' + error.message)
      setUploading(false)
      return
    }
    const { data: { publicUrl } } = supabase.storage.from('img').getPublicUrl(fileName)
    onChange(publicUrl)
    setUploading(false)
  }

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Yüklenen" className="w-44 h-32 object-cover rounded-xl border border-purple-200" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
          >
            <X size={14} />
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="admin-input mt-2 text-xs"
            placeholder="veya URL yapıştırın"
          />
        </div>
      ) : (
        <div>
          <label className="flex flex-col items-center justify-center w-44 h-32 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
            {uploading ? (
              <span className="text-xs text-purple-700">Yükleniyor...</span>
            ) : (
              <>
                <Upload size={22} className="text-purple-400 mb-1" />
                <span className="text-xs text-purple-600 font-medium">Görsel Yükle</span>
                <span className="text-[10px] text-gray-400 mt-1">JPG, PNG, WebP (max 10MB)</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
          <input
            type="text"
            value=""
            onChange={(e) => onChange(e.target.value)}
            className="admin-input mt-2 text-xs"
            placeholder="veya URL yapıştırın (Unsplash vs.)"
          />
        </div>
      )}
    </div>
  )
}
