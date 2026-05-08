import { NextResponse } from "next/server"
import {
  createBooking,
  getBookings,
  getBookingStats,
} from "@/lib/bookings-store"
import { sendNotification } from "@/lib/data"
import { buildWhatsappUrl } from "@/lib/data"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      full_name,
      phone,
      from_city,
      to_city,
      company_id,
      company_name,
      company_color,
      trip_id,
      bus_type,
      departure_time,
      duration,
      travel_date,
      passengers,
      price_per_seat,
      currency,
      notes,
    } = body

    if (!full_name || !phone || !from_city || !to_city || !company_id || !trip_id) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const booking = createBooking({
      full_name,
      phone,
      from_city,
      to_city,
      company_id,
      company_name,
      company_color,
      trip_id,
      bus_type,
      departure_time,
      duration,
      travel_date: travel_date || null,
      passengers: Number(passengers) || 1,
      price_per_seat: Number(price_per_seat) || 0,
      currency: currency || "SAR",
      notes: notes || null,
    })

    // Send Telegram notification
    const currencyLabel = booking.currency === "SAR" ? "ر.س" : "ر.ي"
    await sendNotification("whatsapp", [
      `حجز جديد #${booking.reference}`,
      `الراكب: ${booking.full_name} (${booking.phone})`,
      `الرحلة: ${booking.from_city} → ${booking.to_city}`,
      `الشركة: ${booking.company_name}`,
      `الباص: ${booking.bus_type} | الساعة: ${booking.departure_time}`,
      `الركاب: ${booking.passengers} | الإجمالي: ${booking.total_price.toLocaleString()} ${currencyLabel}`,
      `العمولة: ${booking.commission.toLocaleString()} ${currencyLabel}`,
    ].join("\n")).catch(() => {})

    // Build WhatsApp URL for the booking
    const whatsappMessage = `السلام عليكم، أرغب في حجز ${booking.passengers} مقعد على رحلة ${booking.from_city} إلى ${booking.to_city}
الشركة: ${booking.company_name}
الباص: ${booking.bus_type}
الساعة: ${booking.departure_time}
التاريخ: ${booking.travel_date || "غير محدد"}
الاسم: ${booking.full_name}
رقم الحجز: ${booking.reference}`

    const whatsappUrl = buildWhatsappUrl("967777192477", whatsappMessage)

    return NextResponse.json({
      success: true,
      booking,
      whatsapp_url: whatsappUrl,
    })
  } catch (error) {
    console.error("Bookings API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") as "new" | "contacted" | "confirmed" | "cancelled" | "completed" | null
    const company_id = searchParams.get("company_id")
    const search = searchParams.get("search")
    const stats_only = searchParams.get("stats_only")

    if (stats_only === "true") {
      return NextResponse.json({ success: true, stats: getBookingStats() })
    }

    const bookings = getBookings({
      status: status || undefined,
      company_id: company_id || undefined,
      search: search || undefined,
    })

    return NextResponse.json({ success: true, bookings })
  } catch (error) {
    console.error("Bookings API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
