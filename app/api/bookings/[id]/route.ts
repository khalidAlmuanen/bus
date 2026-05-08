import { NextResponse } from "next/server"
import {
  getBookingById,
  updateBookingStatus,
  updateCommissionStatus,
} from "@/lib/bookings-store"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, commission_status } = body

    const booking = getBookingById(id)
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }

    if (status) {
      const validStatuses = ["new", "contacted", "confirmed", "cancelled", "completed"]
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status" },
          { status: 400 }
        )
      }
      const updated = updateBookingStatus(id, status)
      return NextResponse.json({ success: true, booking: updated })
    }

    if (commission_status) {
      const validCommissionStatuses = ["pending", "earned", "paid"]
      if (!validCommissionStatuses.includes(commission_status)) {
        return NextResponse.json(
          { success: false, error: "Invalid commission_status" },
          { status: 400 }
        )
      }
      const updated = updateCommissionStatus(id, commission_status as "pending" | "earned" | "paid")
      return NextResponse.json({ success: true, booking: updated })
    }

    return NextResponse.json(
      { success: false, error: "No update field provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Booking Update API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const booking = getBookingById(id)
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("Booking Get API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
