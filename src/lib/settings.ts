import { createAdminClient } from './supabase/admin'
import { createClient } from './supabase/server'
import type { SiteSettings } from './types'

// Bu fonksiyon hem server component'larda hem de generateMetadata'da güvenle çağrılır.
// Admin (service role) client kullanır → cookie scope hatası vermez.
export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const settings: SiteSettings = {}
    data?.forEach((s) => { settings[s.key] = s.value || '' })
    return settings
  } catch {
    return {}
  }
}

export const getSiteSettings = getSettings

export async function getPageSeo(pageKey: string) {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('page_seo')
      .select('*')
      .eq('page_key', pageKey)
      .single()
    return data
  } catch {
    return null
  }
}

// Server component'larda (cookie gereken yerde) bu kullanılır
export async function getSettingsWithCookies(): Promise<SiteSettings> {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const settings: SiteSettings = {}
    data?.forEach((s) => { settings[s.key] = s.value || '' })
    return settings
  } catch {
    return {}
  }
}
