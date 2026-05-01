// Business fallback data for Alkohali Bus Company.
// The real source of truth is Supabase (site_settings / cities / trips ...).
// These constants are only used on the client where a full DB fetch is unnecessary
// (e.g. SiteHeader/WhatsAppFloat default contact info).

export const COMPANY = {
  name: "بوابة حجز النقل البري",
  shortName: "بوابة الحجز",
  tagline: "مستقبل السفر البري بين اليمن والسعودية",
  phone: "+967 777 192 477",
  phoneRaw: "+967777192477",
  whatsapp: "967777192477",
  whatsappUrl:
    "https://wa.me/967777192477?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%AA%D8%B0%D9%83%D8%B1%D8%A9",
  email: "info@bus-booking.com",
  address: "بوابة الحجز الإلكتروني",
  yearsOfService: 15,
  passengersServed: "250,000+",
  dailyTrips: 24,
  fleetSize: 40,
} as const

// Only the cities we actually operate between (matches the DB seed)
export const YEMEN_CITIES = ["صنعاء", "إب", "تعز", "المكلا"] as const
export const SAUDI_CITIES = ["مكة المكرمة", "جدة", "الرياض"] as const

export function buildWhatsappUrl(whatsapp: string, text?: string) {
  const defaultText = "السلام عليكم، أرغب في حجز تذكرة"
  const message = (text ?? defaultText) + "\n\n[المصدر: موقع بوابة حجز النقل البري]"
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
}

export async function sendNotification(action: "whatsapp" | "call", details: string) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, details }),
    })
  } catch (error) {
    console.error("Failed to send notification", error)
  }
}
