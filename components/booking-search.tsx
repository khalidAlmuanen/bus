"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Calendar, Users, ArrowLeftRight, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { City } from "@/lib/types"

export function BookingSearch({
  cities,
  initialFrom,
  initialTo,
}: {
  cities: City[]
  initialFrom?: string
  initialTo?: string
}) {
  const yemenCities = useMemo(
    () => cities.filter((c) => c.country === "yemen").map((c) => c.name),
    [cities]
  )
  const saudiCities = useMemo(
    () => cities.filter((c) => c.country === "saudi").map((c) => c.name),
    [cities]
  )

  const defaultFrom =
    initialFrom || yemenCities[0] || saudiCities[0] || "صنعاء"
  const defaultTo =
    initialTo || saudiCities[0] || yemenCities[0] || "جدة"

  const router = useRouter()
  const [from, setFrom] = useState<string>(defaultFrom)
  const [to, setTo] = useState<string>(defaultTo)
  const [date, setDate] = useState<string>("")
  const [passengers, setPassengers] = useState<string>("1")
  const [loading, setLoading] = useState(false)

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const params = new URLSearchParams({ from, to, date, passengers })
    router.push(`/trips?${params.toString()}`)
  }

  // Build quick suggestions dynamically (first 2 yemen origins x first 2 saudi destinations, etc.)
  const suggestions: [string, string][] = [
    [yemenCities[0], saudiCities[1]],
    [yemenCities[0], saudiCities[2]],
    [yemenCities[2], saudiCities[1]],
    [yemenCities[1], saudiCities[1]],
    [saudiCities[1], yemenCities[0]],
  ].filter(([a, b]) => a && b) as [string, string][]

  return (
    <form
      onSubmit={onSearch}
      className="relative rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-premium overflow-hidden"
    >
      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs font-bold">
        <Zap className="h-3.5 w-3.5 text-accent fill-accent" />
        حجز ذكي وسريع - احصل على نتائجك خلال ثوانٍ
      </div>

      <div className="p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-12 md:gap-3">
          {/* From */}
          <div className="md:col-span-3 relative">
            <label className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              <MapPin className="h-3 w-3 text-primary" />
              نقطة الانطلاق
            </label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-12 text-base font-semibold bg-secondary/60 border-border">
                <SelectValue placeholder="من أين؟" />
              </SelectTrigger>
              <SelectContent>
                {yemenCities.length > 0 && (
                  <>
                    <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground">
                      مدن اليمن
                    </div>
                    {yemenCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </>
                )}
                {saudiCities.length > 0 && (
                  <>
                    <div className="px-2 py-1 mt-1 text-[11px] font-bold text-muted-foreground">
                      مدن السعودية
                    </div>
                    {saudiCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Swap */}
          <div className="hidden md:flex md:col-span-1 items-end justify-center pb-1">
            <button
              type="button"
              onClick={swap}
              aria-label="تبديل"
              suppressHydrationWarning
              className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:rotate-180 transition-all duration-300"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* To */}
          <div className="md:col-span-3">
            <label className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              <MapPin className="h-3 w-3 text-accent" />
              وجهة السفر
            </label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-12 text-base font-semibold bg-secondary/60 border-border">
                <SelectValue placeholder="إلى أين؟" />
              </SelectTrigger>
              <SelectContent>
                {saudiCities.length > 0 && (
                  <>
                    <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground">
                      مدن السعودية
                    </div>
                    {saudiCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </>
                )}
                {yemenCities.length > 0 && (
                  <>
                    <div className="px-2 py-1 mt-1 text-[11px] font-bold text-muted-foreground">
                      مدن اليمن
                    </div>
                    {yemenCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              <Calendar className="h-3 w-3 text-primary" />
              التاريخ
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 text-base font-semibold bg-secondary/60 border-border"
            />
          </div>

          {/* Passengers */}
          <div className="md:col-span-1">
            <label className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              <Users className="h-3 w-3 text-primary" />
              عدد
            </label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="h-12 text-base font-semibold bg-secondary/60 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex items-end">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 text-base shadow-soft"
            >
              <Search className="h-4 w-4" />
              بحث الرحلات
            </Button>
          </div>
        </div>

        {/* Quick links */}
        {suggestions.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">الأكثر بحثاً:</span>
            {suggestions.map(([f, t]) => (
              <button
                key={`${f}-${t}`}
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  setFrom(f)
                  setTo(t)
                }}
                className="text-xs font-semibold rounded-full border border-border bg-secondary/50 hover:border-primary hover:bg-primary hover:text-primary-foreground px-3 py-1 transition-all"
              >
                {f} ← {t}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}
