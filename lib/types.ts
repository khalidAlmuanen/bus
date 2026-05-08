export type City = {
  id: string
  name: string
  country: "yemen" | "saudi"
  slug: string
  is_active: boolean
  sort_order: number
}

export type Company = {
  id: string
  name: string
  short_name: string
  slug: string
  description: string
  about: string
  coverage: string
  features: string[]
  amenities: {
    icon: string
    label: string
    description: string
  }[]
  phone: string
  whatsapp: string
  logo: string | null
  banner_image: string | null
  gallery: {
    type: "image" | "video"
    url: string
    thumbnail?: string
    caption?: string
  }[]
  fleet: {
    id: string
    name: string
    type: string
    capacity: number
    features: string[]
    image: string | null
  }[]
  color: string
  is_active: boolean
  sort_order: number
}

export type Trip = {
  id: string
  company_id: string
  from_city: string
  to_city: string
  direction: "yemen-to-saudi" | "saudi-to-yemen"
  duration: string
  departure_time: string
  price: number
  currency: "SAR" | "YER"
  bus_type: string
  seats_available: number
  featured: boolean
  is_active: boolean
  sort_order: number
}

export type Feature = {
  id: string
  title: string
  description: string
  icon: string
  is_active: boolean
  sort_order: number
}

export type Testimonial = {
  id: string
  name: string
  city: string
  rating: number
  text: string
  is_active: boolean
  sort_order: number
}

export type Faq = {
  id: string
  question: string
  answer: string
  is_active: boolean
  sort_order: number
}

export type Stat = {
  id: string
  value: string
  label: string
  sort_order: number
}

export type SiteSettings = {
  id: number
  company_name: string
  short_name: string
  tagline: string
  phone: string
  phone_raw: string
  whatsapp: string
  email: string
  address: string
  years_of_service: number
  passengers_served: string
  daily_trips: number
  fleet_size: number
  facebook_url: string | null
  instagram_url: string | null
  twitter_url: string | null
  youtube_url: string | null
  tiktok_url: string | null
}

export type BookingStatus = "new" | "contacted" | "confirmed" | "cancelled" | "completed"

export type Booking = {
  id: string
  reference: string
  full_name: string
  phone: string
  from_city: string
  to_city: string
  company_id: string
  company_name: string
  company_color: string
  trip_id: string
  bus_type: string
  departure_time: string
  duration: string
  travel_date: string | null
  passengers: number
  price_per_seat: number
  currency: "SAR" | "YER"
  total_price: number
  commission: number
  commission_status: "pending" | "earned" | "paid"
  notes: string | null
  status: BookingStatus
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  full_name: string
  phone: string | null
  email: string | null
  subject: string | null
  message: string
  status: "new" | "read" | "replied" | "archived"
  created_at: string
}
