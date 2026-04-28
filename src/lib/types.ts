// Database tipleri — tüm tabloların TS karşılığı

export type Slider = {
  id: string
  title: string
  subtitle: string | null
  image_url: string | null
  button_text: string | null
  button_link: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type TabArticle = {
  id: string
  tab_title: string
  slug: string
  title: string
  meta_description: string | null
  content: string | null
  image_url: string | null
  is_active: boolean
  sort_order: number
}

export type Service = {
  id: string
  name: string
  slug: string
  title: string | null
  meta_description: string | null
  short_description: string | null
  content: string | null
  icon: string
  image_url: string | null
  price_text: string | null
  duration_text: string | null
  is_active: boolean
  is_featured: boolean
  sort_order: number
  created_at: string
}

export type Specialist = {
  id: string
  name: string
  slug: string
  title: string | null
  bio: string | null
  image_url: string | null
  specialties: string[] | null
  instagram_url: string | null
  is_active: boolean
  sort_order: number
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  meta_description: string | null
  excerpt: string | null
  content: string | null
  image_url: string | null
  category: string
  reading_time: number
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type GalleryItem = {
  id: string
  title: string | null
  image_url: string
  alt_text: string | null
  category: string
  is_active: boolean
  sort_order: number
}

export type Testimonial = {
  id: string
  name: string
  location: string | null
  comment: string
  rating: number
  source: string
  avatar_url: string | null
  is_active: boolean
  sort_order: number
}

export type Campaign = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  cta_text: string
  cta_link: string | null
  badge_text: string | null
  valid_until: string | null
  is_active: boolean
  sort_order: number
}

export type AppointmentRequest = {
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

export type ContactSubmission = {
  id: string
  name: string
  phone: string | null
  email: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export type Faq = {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  is_active: boolean
}

export type SiteSettings = Record<string, string>

export type HomepageContent = {
  id: string
  section_key: string
  title: string | null
  subtitle: string | null
  content: string | null
  image_url: string | null
}

export type InstagramPost = {
  id: string
  ig_post_id: string | null
  caption: string | null
  image_url: string
  permalink: string | null
  media_type: string
  posted_at: string | null
  is_active: boolean
  sort_order: number
}

export type PageSeo = {
  id: string
  page_key: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_image: string | null
}
