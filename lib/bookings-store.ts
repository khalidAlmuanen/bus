import type { Booking, BookingStatus } from "@/lib/types"

// In-memory booking store for development.
// Replace with Supabase or any database for production.

const bookings: Booking[] = []
let counter = 0

function generateReference(): string {
  counter++
  const year = new Date().getFullYear()
  const seq = String(counter).padStart(4, "0")
  return `BK-${year}-${seq}`
}

function generateId(): string {
  return `booking_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function createBooking(data: {
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
  notes: string | null
  commission_per_seat?: number
}): Booking {
  const commissionPerSeat = data.commission_per_seat ?? 15
  const now = new Date().toISOString()

  const booking: Booking = {
    id: generateId(),
    reference: generateReference(),
    full_name: data.full_name,
    phone: data.phone,
    from_city: data.from_city,
    to_city: data.to_city,
    company_id: data.company_id,
    company_name: data.company_name,
    company_color: data.company_color,
    trip_id: data.trip_id,
    bus_type: data.bus_type,
    departure_time: data.departure_time,
    duration: data.duration,
    travel_date: data.travel_date,
    passengers: data.passengers,
    price_per_seat: data.price_per_seat,
    currency: data.currency,
    total_price: data.price_per_seat * data.passengers,
    commission: commissionPerSeat * data.passengers,
    commission_status: "pending",
    notes: data.notes,
    status: "new",
    created_at: now,
    updated_at: now,
  }

  bookings.push(booking)
  return booking
}

export function getBookings(filters?: {
  status?: BookingStatus
  company_id?: string
  search?: string
}): Booking[] {
  let result = [...bookings]

  if (filters?.status) {
    result = result.filter((b) => b.status === filters.status)
  }
  if (filters?.company_id) {
    result = result.filter((b) => b.company_id === filters.company_id)
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (b) =>
        b.reference.toLowerCase().includes(q) ||
        b.full_name.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.from_city.includes(q) ||
        b.to_city.includes(q)
    )
  }

  return result.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id)
}

export function getBookingByReference(reference: string): Booking | undefined {
  return bookings.find((b) => b.reference === reference)
}

export function updateBookingStatus(
  id: string,
  status: BookingStatus
): Booking | null {
  const booking = bookings.find((b) => b.id === id)
  if (!booking) return null

  booking.status = status
  booking.updated_at = new Date().toISOString()

  // Auto-update commission status
  if (status === "confirmed" || status === "completed") {
    booking.commission_status = "earned"
  } else if (status === "cancelled") {
    booking.commission_status = "pending"
  }

  return booking
}

export function updateCommissionStatus(
  id: string,
  commission_status: "pending" | "earned" | "paid"
): Booking | null {
  const booking = bookings.find((b) => b.id === id)
  if (!booking) return null

  booking.commission_status = commission_status
  booking.updated_at = new Date().toISOString()
  return booking
}

export function getBookingStats(): {
  total: number
  new: number
  contacted: number
  confirmed: number
  cancelled: number
  completed: number
  totalRevenue: number
  totalCommission: number
  earnedCommission: number
  pendingCommission: number
  paidCommission: number
} {
  const stats = {
    total: bookings.length,
    new: 0,
    contacted: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
    totalRevenue: 0,
    totalCommission: 0,
    earnedCommission: 0,
    pendingCommission: 0,
    paidCommission: 0,
  }

  for (const b of bookings) {
    stats[b.status]++
    stats.totalRevenue += b.total_price
    stats.totalCommission += b.commission
    if (b.commission_status === "earned") stats.earnedCommission += b.commission
    if (b.commission_status === "pending") stats.pendingCommission += b.commission
    if (b.commission_status === "paid") stats.paidCommission += b.commission
  }

  return stats
}
