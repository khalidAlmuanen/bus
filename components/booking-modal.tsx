"use client"

import { useState } from "react"
import {
  MessageCircle,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Bus,
  Copy,
  Check,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Trip, Company } from "@/lib/types"

type BookingModalProps = {
  trip: Trip
  company: Company
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "form" | "submitting" | "success" | "error"

export function BookingModal({
  trip,
  company,
  open,
  onOpenChange,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>("form")
  const [bookingRef, setBookingRef] = useState("")
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const currencyLabel = trip.currency === "SAR" ? "ر.س" : "ر.ي"

  function handleClose() {
    onOpenChange(false)
    // Reset after animation
    setTimeout(() => {
      setStep("form")
      setBookingRef("")
      setWhatsappUrl("")
      setErrorMsg("")
    }, 300)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStep("submitting")
    setErrorMsg("")

    const fd = new FormData(e.currentTarget)
    const payload = {
      full_name: fd.get("full_name") as string,
      phone: fd.get("phone") as string,
      from_city: trip.from_city,
      to_city: trip.to_city,
      company_id: company.id,
      company_name: company.name,
      company_color: company.color,
      trip_id: trip.id,
      bus_type: trip.bus_type,
      departure_time: trip.departure_time,
      duration: trip.duration,
      travel_date: fd.get("travel_date") as string || null,
      passengers: Number(fd.get("passengers")) || 1,
      price_per_seat: trip.price,
      currency: trip.currency,
      notes: (fd.get("notes") as string) || null,
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!data.success) {
        setStep("error")
        setErrorMsg(data.error || "حدث خطأ غير متوقع")
        return
      }

      setBookingRef(data.booking.reference)
      setWhatsappUrl(data.whatsapp_url)
      setStep("success")

      // Open WhatsApp automatically
      window.open(data.whatsapp_url, "_blank")
    } catch {
      setStep("error")
      setErrorMsg("تعذر الاتصال بالخادم")
    }
  }

  function copyReference() {
    navigator.clipboard.writeText(bookingRef)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-black text-foreground flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                حجز رحلة
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                أكمل بياناتك لتأكيد الحجز عبر الواتساب
              </DialogDescription>
            </DialogHeader>

            {/* Trip Summary Card */}
            <div className="rounded-xl bg-secondary/60 border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full text-[11px] font-black px-2.5 py-1"
                  style={{ backgroundColor: company.color + "20", color: company.color }}
                >
                  {company.short_name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[11px] font-black px-2.5 py-1">
                  {trip.bus_type}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="min-w-0">
                  <div className="font-display font-black text-lg text-foreground">
                    {trip.from_city}
                  </div>
                </div>
                <ArrowLeft className="h-4 w-4 text-accent shrink-0" />
                <div className="min-w-0">
                  <div className="font-display font-black text-lg text-foreground">
                    {trip.to_city}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {trip.departure_time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  {trip.seats_available} مقعد متاح
                </span>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-[11px] text-muted-foreground font-bold">السعر للفرد</div>
                <div className="font-display font-black text-2xl text-primary leading-none">
                  {Number(trip.price).toLocaleString("ar")}{" "}
                  <span className="text-sm">{currencyLabel}</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="full_name" className="font-semibold mb-1.5 block text-sm">
                    الاسم الكامل
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    required
                    placeholder="اكتب اسمك الكامل"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold mb-1.5 block text-sm">
                    رقم الجوال
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="+967 ..."
                    dir="ltr"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="passengers" className="font-semibold mb-1.5 block text-sm">
                    عدد الركاب
                  </Label>
                  <Input
                    id="passengers"
                    name="passengers"
                    type="number"
                    min={1}
                    max={trip.seats_available}
                    defaultValue={1}
                    required
                    className="h-11"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="travel_date" className="font-semibold mb-1.5 block text-sm">
                    تاريخ السفر (اختياري)
                  </Label>
                  <Input
                    id="travel_date"
                    name="travel_date"
                    type="date"
                    className="h-11"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes" className="font-semibold mb-1.5 block text-sm">
                    ملاحظات (اختياري)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    placeholder="أي طلبات خاصة..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 font-bold"
                style={{ backgroundColor: company.color, color: "white" }}
              >
                <MessageCircle className="h-4 w-4" />
                تأكيد الحجز عبر الواتساب
              </Button>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                بالضغط على الزر، سيتم تسجيل حجزك وفتح محادثة واتساب لإتمام التأكيد مع المكتب
              </p>
            </form>
          </>
        )}

        {step === "submitting" && (
          <div className="py-16 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            </div>
            <p className="font-display font-bold text-lg text-foreground">
              جارٍ تسجيل الحجز...
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 flex flex-col items-center text-center gap-5">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-foreground">
                تم تسجيل حجزك بنجاح
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                تم فتح محادثة الواتساب لإتمام التأكيد مع المكتب. احتفظ برقم الحجز التالي:
              </p>
            </div>

            {/* Reference Number */}
            <div className="w-full rounded-xl bg-primary/5 border-2 border-dashed border-primary/30 p-4">
              <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                رقم الحجز
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono font-black text-2xl text-primary tracking-wider">
                  {bookingRef}
                </span>
                <button
                  onClick={copyReference}
                  className="h-8 w-8 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  title="نسخ"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4 text-primary" />
                  )}
                </button>
              </div>
            </div>

            {/* Trip recap */}
            <div className="w-full rounded-xl bg-secondary/60 border border-border p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرحلة</span>
                <span className="font-bold text-foreground">{trip.from_city} ← {trip.to_city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشركة</span>
                <span className="font-bold" style={{ color: company.color }}>{company.short_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الباص</span>
                <span className="font-bold text-foreground">{trip.bus_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الساعة</span>
                <span className="font-bold text-foreground">{trip.departure_time}</span>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <Button
                asChild
                size="lg"
                className="flex-1 gap-2"
                style={{ backgroundColor: company.color, color: "white" }}
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  فتح الواتساب
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleClose}
              >
                إغلاق
              </Button>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="py-12 flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-foreground">
                حدث خطأ
              </h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {errorMsg}
              </p>
            </div>
            <Button variant="outline" onClick={() => setStep("form")}>
              إعادة المحاولة
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
