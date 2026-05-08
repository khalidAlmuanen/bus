"use client"

import { useEffect, useState, useCallback } from "react"
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  CreditCard,
  Loader2,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/lib/types"

type Stats = {
  total: number
  totalCommission: number
  earnedCommission: number
  pendingCommission: number
  paidCommission: number
}

export default function AdminCommissionsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "earned" | "paid">("all")
  const [payingId, setPayingId] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        fetch("/api/bookings?stats_only=true"),
        fetch("/api/bookings"),
      ])
      const statsData = await statsRes.json()
      const bookingsData = await bookingsRes.json()
      if (statsData.success) setStats(statsData.stats)
      if (bookingsData.success) {
        // Only show bookings with commissions
        setBookings(bookingsData.bookings.filter((b: Booking) => b.commission > 0))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function markAsPaid(id: string) {
    setPayingId(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commission_status: "paid" }),
      })
      const data = await res.json()
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? data.booking : b))
        )
        if (stats) {
          setStats({
            ...stats,
            paidCommission: stats.paidCommission + (bookings.find((b) => b.id === id)?.commission || 0),
            earnedCommission: stats.earnedCommission - (bookings.find((b) => b.id === id)?.commission || 0),
          })
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setPayingId(null)
    }
  }

  const filteredBookings = filter === "all"
    ? bookings
    : bookings.filter((b) => b.commission_status === filter)

  const currencyLabel = (c: "SAR" | "YER") => (c === "SAR" ? "ر.س" : "ر.ي")

  const COMMISSION_STATUS: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "معلقة", color: "text-amber-600", bg: "bg-amber-50" },
    earned: { label: "مكتسبة", color: "text-emerald-600", bg: "bg-emerald-50" },
    paid: { label: "مدفوعة", color: "text-primary", bg: "bg-primary/5" },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-foreground">
          تتبع العمولات
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          إدارة عمولاتك من كل حجز كوسيط رقمي
        </p>
      </div>

      {/* Commission Summary Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-sm font-bold text-amber-700">عمولات معلقة</div>
            </div>
            <div className="font-display font-black text-3xl text-amber-700">
              {stats.pendingCommission.toLocaleString("ar")}
              <span className="text-sm font-bold mr-1">ر.س</span>
            </div>
            <p className="text-xs text-amber-600 mt-1">في انتظار تأكيد الحجز</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-sm font-bold text-emerald-700">عمولات مكتسبة</div>
            </div>
            <div className="font-display font-black text-3xl text-emerald-700">
              {stats.earnedCommission.toLocaleString("ar")}
              <span className="text-sm font-bold mr-1">ر.س</span>
            </div>
            <p className="text-xs text-emerald-600 mt-1">حجوزات مؤكدة أو مكتملة</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Wallet className="h-6 w-6" />
              </div>
              <div className="text-sm font-bold text-primary">عمولات مدفوعة</div>
            </div>
            <div className="font-display font-black text-3xl text-primary">
              {stats.paidCommission.toLocaleString("ar")}
              <span className="text-sm font-bold mr-1">ر.س</span>
            </div>
            <p className="text-xs text-primary/70 mt-1">تم استلامها من المكاتب</p>
          </div>
        </div>
      )}

      {/* Total Summary */}
      {stats && (
        <div className="rounded-2xl bg-card border-2 border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <div className="text-sm font-bold text-muted-foreground">إجمالي العمولات</div>
              <div className="font-display font-black text-3xl text-foreground">
                {stats.totalCommission.toLocaleString("ar")}
                <span className="text-base mr-1">ر.س</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="font-display font-black text-lg text-foreground">{stats.total}</div>
              <div className="text-[11px] text-muted-foreground font-bold">حجز</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="font-display font-black text-lg text-emerald-600">
                {stats.total > 0 ? Math.round((stats.earnedCommission / Math.max(stats.totalCommission, 1)) * 100) : 0}%
              </div>
              <div className="text-[11px] text-muted-foreground font-bold">نسبة التحصيل</div>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>الكل</FilterBtn>
        <FilterBtn active={filter === "pending"} onClick={() => setFilter("pending")}>معلقة</FilterBtn>
        <FilterBtn active={filter === "earned"} onClick={() => setFilter("earned")}>مكتسبة</FilterBtn>
        <FilterBtn active={filter === "paid"} onClick={() => setFilter("paid")}>مدفوعة</FilterBtn>
      </div>

      {/* Commission List */}
      {filteredBookings.length === 0 ? (
        <div className="rounded-2xl bg-card border border-border p-16 text-center">
          <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="font-display font-bold text-xl text-foreground">لا توجد عمولات</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((booking) => {
            const commStatus = COMMISSION_STATUS[booking.commission_status]
            return (
              <div
                key={booking.id}
                className="rounded-2xl bg-card border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono font-bold text-primary text-sm">#{booking.reference}</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${commStatus.color} ${commStatus.bg}`}>
                      {commStatus.label}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full text-[11px] font-bold px-2 py-0.5"
                      style={{ backgroundColor: booking.company_color + "20", color: booking.company_color }}
                    >
                      {booking.company_name}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {booking.from_city} ← {booking.to_city} | {booking.full_name} | {booking.passengers} راكب
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-left">
                    <div className="font-display font-black text-xl text-foreground">
                      {booking.commission.toLocaleString("ar")} {currencyLabel(booking.currency)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      15 {currencyLabel(booking.currency)} × {booking.passengers}
                    </div>
                  </div>

                  {booking.commission_status === "earned" && (
                    <Button
                      size="sm"
                      className="gap-1.5 text-xs"
                      disabled={payingId === booking.id}
                      onClick={() => markAsPaid(booking.id)}
                    >
                      {payingId === booking.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <CreditCard className="h-3 w-3" />
                      )}
                      تم الدفع
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  )
}
