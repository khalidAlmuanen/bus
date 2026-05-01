"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X, Phone } from "lucide-react"
import { buildWhatsappUrl, sendNotification } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { SiteSettings } from "@/lib/types"

export function WhatsAppFloat({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const waUrl = buildWhatsappUrl(settings.whatsapp)

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      {open && (
        <div className="w-72 rounded-2xl bg-card text-card-foreground shadow-premium border border-border overflow-hidden animate-fade-up">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-black">
                ك
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{settings.short_name}</div>
                <div className="text-[11px] opacity-80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  متاحون الآن
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              className="opacity-80 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="rounded-xl bg-secondary px-3 py-2.5 text-sm">
              مرحباً بك! كيف نستطيع مساعدتك في رحلتك؟
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground font-bold py-2.5 text-sm hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              ابدأ المحادثة الآن
            </a>
            <a
              href={`tel:${settings.phone_raw}`}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent text-accent-foreground font-bold py-2.5 text-sm hover:bg-accent/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              اتصل بنا مباشرة
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="تواصل واتساب"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-premium hover:scale-105 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
        <MessageCircle className="relative h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-black text-accent-foreground flex items-center justify-center ring-2 ring-background">
          ١
        </span>
      </button>
    </div>
  )
}
