"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Bus, Phone, Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWhatsappUrl } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { SiteSettings } from "@/lib/types"

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/trips", label: "الرحلات" },
  { href: "/routes", label: "الوجهات" },
  { href: "/fleet", label: "أسطولنا" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
]

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const waUrl = buildWhatsappUrl(settings.whatsapp)

  return (
    <>
      <div className="hidden md:block bg-primary text-primary-foreground text-sm">
        <div className="container-wide flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              رحلات يومية بين اليمن والسعودية
            </span>
            <span className="inline-flex items-center gap-2 opacity-90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              الحجز مفتوح الآن
            </span>
          </div>
          <a
            href={`tel:${settings.phone_raw}`}
            className="inline-flex items-center gap-2 font-medium hover:text-accent transition-colors"
            dir="ltr"
          >
            <Phone className="h-3.5 w-3.5" />
            {settings.phone}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
            : "bg-background/60 backdrop-blur-md"
        )}
      >
        <div className="container-wide flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group" aria-label="الرئيسية">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-xl shadow-inner group-hover:scale-105 transition-transform">
              <Bus className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg text-foreground">
                {settings.short_name}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                للنقل البري الفاخر
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-soft"
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                احجز الآن
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="فتح القائمة"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden border-t border-border transition-[max-height,opacity] duration-300",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="container-wide flex flex-col py-4 gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-base font-semibold rounded-lg hover:bg-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${settings.phone_raw}`}
              className="px-3 py-2.5 text-base font-bold text-primary inline-flex items-center gap-2"
              dir="ltr"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}
