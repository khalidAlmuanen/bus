"use client"

import { useState, useEffect, useCallback } from "react"
import { Bus, MapPin, X } from "lucide-react"

const BOOKING_EVENTS = [
  { name: "أحمد", from: "صنعاء", to: "الرياض", time: "منذ دقيقة" },
  { name: "محمد", from: "جدة", to: "عدن", time: "منذ 3 دقائق" },
  { name: "فاطمة", from: "تعز", to: "مكة", time: "منذ 5 دقائق" },
  { name: "علي", from: "الرياض", to: "صنعاء", time: "منذ 7 دقائق" },
  { name: "سارة", from: "إب", to: "جدة", time: "منذ 10 دقائق" },
  { name: "خالد", from: "المكلا", to: "الدمام", time: "منذ 12 دقيقة" },
  { name: "نورة", from: "عدن", to: "الرياض", time: "منذ 15 دقيقة" },
  { name: "ياسر", from: "مكة", to: "تعز", time: "منذ 18 دقيقة" },
  { name: "هدى", from: "صنعاء", to: "جدة", time: "منذ 20 دقيقة" },
  { name: "عبدالله", from: "الدمام", to: "المكلا", time: "منذ 22 دقيقة" },
]

export function BookingNotifications() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const showNext = useCallback(() => {
    if (dismissed) return
    setVisible(true)
    setCurrent((prev) => (prev + 1) % BOOKING_EVENTS.length)

    const hideTimer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(hideTimer)
  }, [dismissed])

  useEffect(() => {
    if (dismissed) return

    // Show first notification after 8 seconds
    const initialTimer = setTimeout(() => {
      showNext()
    }, 8000)

    // Then show every 25-40 seconds
    const interval = setInterval(() => {
      showNext()
    }, 25000 + Math.random() * 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [dismissed, showNext])

  if (!visible || dismissed) return null

  const event = BOOKING_EVENTS[current]

  return (
    <div className="fixed bottom-20 left-4 z-50 max-w-[320px] animate-in slide-in-from-left-full duration-500">
      <div className="relative bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-premium p-4 pr-10">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          suppressHydrationWarning
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bus className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground truncate">
              {event.name} حجز تذكرة
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{event.from} ← {event.to}</span>
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-1">{event.time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
