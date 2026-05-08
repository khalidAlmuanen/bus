"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Ticket,
  Search,
  Filter,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  UserCheck,
  Loader2,
  ChevronDown,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { buildWhatsappUrl } from "@/lib/data"
import type { Booking, BookingStatus } from "@/lib/types"

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  new: { label: "جديد", color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
  contacted: { label: "تم التواصل", color: "text-amber-600", bg: "bg-amber-50", icon: Phone },
  confirmed: { label: "مؤكد", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
  cancelled: { label: "ملغي", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  completed: { label: "مكتمل", color: "text-primary", bg: "bg-primary/5", icon: UserCheck },
}

const NEXT_STATUS: Record<BookingStatus, BookingStatus | null> = {
  new: "contacted",
  contacted: "confirmed",
  confirmed: "completed",
  cancelled: null,
  completed: null,
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const loadBookings = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.set("status", statusFilter)
      if (search) params.set("search", search)

      const res = await fetch(`/api/bookings?${params}`)
      const data = await res.json()
      if (data.success) setBookings(data.bookings)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => {
    loadBookings()
  }, [loadBookings])

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? data.booking : b))
        )
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  const currencyLabel = (c: "SAR" | "YER") => (c === "SAR" ? "ر.س" : "ر.ي")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-foreground">
          إدارة الحجوزات
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          تتبع جميع حجوزات الركاب وحالتها
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، الرقم، رقم الحجز..."
            className="h-11 pr-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <FilterButton
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          >
            الكل
          </FilterButton>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <FilterButton
              key={key}
              active={statusFilter === key}
              onClick={() => setStatusFilter(key as BookingStatus)}
              color={cfg.color}
            >
              {cfg.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl bg-card border border-border p-16 text-center">
          <Ticket className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="font-display font-bold text-xl text-foreground">لا توجد حجوزات</p>
          <p className="text-muted-foreground text-sm mt-1">
            {search || statusFilter !== "all"
              ? "جرّب تغيير معايير البحث"
              : "ستظهر الحجوزات هنا عندما يحجز الركاب"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const statusCfg = STATUS_CONFIG[booking.status]
            const nextStatus = NEXT_STATUS[booking.status]
            const StatusIcon = statusCfg.icon
            const waUrl = buildWhatsappUrl(
              "967777192477",
              `مرحباً ${booking.full_name}، بخصوص حجزك #${booking.reference} رحلة ${booking.from_city} ← ${booking.to_city}`
            )

            return (
              <div
                key={booking.id}
                className="rounded-2xl bg-card border border-border p-5 hover:shadow-soft transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-mono font-bold text-primary text-sm">
                        #{booking.reference}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusCfg.color} ${statusCfg.bg}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusCfg.label}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full text-[11px] font-bold px-2 py-0.5"
                        style={{ backgroundColor: booking.company_color + "20", color: booking.company_color }}
                      >
                        {booking.company_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-lg text-foreground">
                        {booking.from_city}
                      </span>
                      <span className="text-muted-foreground">←</span>
                      <span className="font-display font-bold text-lg text-foreground">
                        {booking.to_city}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        {booking.full_name}
                      </span>
                      <span className="inline-flex items-center gap-1" dir="ltr">
                        <Phone className="h-3 w-3" />
                        {booking.phone}
                      </span>
                      <span>{booking.bus_type} | {booking.departure_time}</span>
                      <span>{booking.passengers} راكب</span>
                      {booking.travel_date && <span>التاريخ: {booking.travel_date}</span>}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="text-left">
                      <div className="text-[11px] text-muted-foreground font-bold">الإجمالي</div>
                      <div className="font-display font-black text-xl text-foreground">
                        {booking.total_price.toLocaleString("ar")} {currencyLabel(booking.currency)}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">
                        عمولة: {booking.commission.toLocaleString("ar")} {currencyLabel(booking.currency)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {nextStatus && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs"
                          disabled={updatingId === booking.id}
                          onClick={() => updateStatus(booking.id, nextStatus)}
                        >
                          {updatingId === booking.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                          {STATUS_CONFIG[nextStatus].label}
                        </Button>
                      )}
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                      >
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-3 w-3" />
                          واتساب
                        </a>
                      </Button>
                      {booking.status !== "cancelled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={updatingId === booking.id}
                          onClick={() => updateStatus(booking.id, "cancelled")}
                        >
                          <XCircle className="h-3 w-3" />
                          إلغاء
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : color
          ? `${color} bg-opacity-10 hover:bg-opacity-20`
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  )
}
