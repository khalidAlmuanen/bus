"use client"

import { useEffect, useState } from "react"
import {
  Ticket,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Stats = {
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
}

type Booking = {
  id: string
  reference: string
  full_name: string
  phone: string
  from_city: string
  to_city: string
  company_name: string
  company_color: string
  bus_type: string
  departure_time: string
  passengers: number
  total_price: number
  currency: "SAR" | "YER"
  commission: number
  commission_status: "pending" | "earned" | "paid"
  status: "new" | "contacted" | "confirmed" | "cancelled" | "completed"
  created_at: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "جديد", color: "text-blue-600", bg: "bg-blue-50" },
  contacted: { label: "تم التواصل", color: "text-amber-600", bg: "bg-amber-50" },
  confirmed: { label: "مؤكد", color: "text-emerald-600", bg: "bg-emerald-50" },
  cancelled: { label: "ملغي", color: "text-red-600", bg: "bg-red-50" },
  completed: { label: "مكتمل", color: "text-primary", bg: "bg-primary/5" },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch("/api/bookings?stats_only=true"),
          fetch("/api/bookings"),
        ])
        const statsData = await statsRes.json()
        const bookingsData = await bookingsRes.json()

        if (statsData.success) setStats(statsData.stats)
        if (bookingsData.success) setRecentBookings(bookingsData.bookings.slice(0, 10))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!stats) return null

  const currencyLabel = (c: "SAR" | "YER") => (c === "SAR" ? "ر.س" : "ر.ي")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-foreground">
          لوحة التحكم
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          نظرة عامة على الحجوزات والعمولات
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Ticket}
          label="إجمالي الحجوزات"
          value={stats.total}
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="حجوزات جديدة"
          value={stats.new}
          color="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="حجوزات مؤكدة"
          value={stats.confirmed}
          color="emerald"
        />
        <StatCard
          icon={XCircle}
          label="حجوزات ملغاة"
          value={stats.cancelled}
          color="red"
        />
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div className="text-sm font-bold text-muted-foreground">عمولات معلقة</div>
          </div>
          <div className="font-display font-black text-2xl text-amber-600">
            {stats.pendingCommission.toLocaleString("ar")} <span className="text-sm">ر.س</span>
          </div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-sm font-bold text-muted-foreground">عمولات مكتسبة</div>
          </div>
          <div className="font-display font-black text-2xl text-emerald-600">
            {stats.earnedCommission.toLocaleString("ar")} <span className="text-sm">ر.س</span>
          </div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-sm font-bold text-muted-foreground">عمولات مدفوعة</div>
          </div>
          <div className="font-display font-black text-2xl text-primary">
            {stats.paidCommission.toLocaleString("ar")} <span className="text-sm">ر.س</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">
            آخر الحجوزات
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/bookings">عرض الكل</Link>
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            <Ticket className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-bold">لا توجد حجوزات بعد</p>
            <p className="text-sm mt-1">ستظهر الحجوزات هنا عندما يحجز الركاب رحلاتهم</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">رقم الحجز</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">الراكب</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">الرحلة</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">الشركة</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">الحالة</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground">العمولة</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => {
                  const statusCfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.new
                  return (
                    <tr key={booking.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="px-4 py-3 font-mono font-bold text-primary">
                        {booking.reference}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-foreground">{booking.full_name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1" dir="ltr">
                          <Phone className="h-3 w-3" />
                          {booking.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold">{booking.from_city}</span>
                        <span className="text-muted-foreground mx-1">←</span>
                        <span className="font-semibold">{booking.to_city}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center rounded-full text-[11px] font-bold px-2 py-0.5"
                          style={{ backgroundColor: booking.company_color + "20", color: booking.company_color }}
                        >
                          {booking.company_name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${statusCfg.color} ${statusCfg.bg}`}>
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">
                        {booking.commission.toLocaleString("ar")} {currencyLabel(booking.currency)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  color: "primary" | "blue" | "emerald" | "red"
}) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="font-display font-black text-3xl text-foreground">
        {value.toLocaleString("ar")}
      </div>
      <div className="text-xs font-bold text-muted-foreground mt-1">{label}</div>
    </div>
  )
}
