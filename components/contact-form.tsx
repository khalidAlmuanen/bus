"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { buildWhatsappUrl } from "@/lib/data"
import type { SiteSettings } from "@/lib/types"

export function ContactForm({ settings }: { settings: SiteSettings }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const name = (fd.get("name") as string) || ""
    const phone = (fd.get("phone") as string) || ""
    const subject = (fd.get("subject") as string) || ""
    const message = (fd.get("message") as string) || ""

    const text = `مرحباً، اسمي ${name}.
رقمي: ${phone}
الموضوع: ${subject}

${message}`
    const url = buildWhatsappUrl(settings.whatsapp, text)
    window.open(url, "_blank")
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 shadow-premium text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display font-black text-2xl text-foreground">
          تم استلام رسالتك
        </h3>
        <p className="mt-2 text-muted-foreground">
          تم فتح محادثة الواتساب لإتمام التواصل السريع. سيرد عليك فريقنا خلال دقائق.
        </p>
        <Button onClick={() => setSent(false)} variant="outline" className="mt-6">
          إرسال رسالة جديدة
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-premium space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="font-semibold mb-1.5 block">
            الاسم الكامل
          </Label>
          <Input id="name" name="name" required placeholder="اكتب اسمك" className="h-11" />
        </div>
        <div>
          <Label htmlFor="phone" className="font-semibold mb-1.5 block">
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
      </div>
      <div>
        <Label htmlFor="subject" className="font-semibold mb-1.5 block">
          الموضوع
        </Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="حجز، استفسار، شكوى..."
          className="h-11"
        />
      </div>
      <div>
        <Label htmlFor="message" className="font-semibold mb-1.5 block">
          الرسالة
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="اكتب تفاصيل استفسارك هنا..."
        />
      </div>
      {error && (
        <div className="rounded-lg bg-destructive/10 text-destructive text-sm px-3 py-2">
          {error}
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 font-bold gap-2"
      >
        <Send className="h-4 w-4" />
        {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        بالضغط على الإرسال، سيتم حفظ رسالتك لدينا وفتح محادثة الواتساب للتواصل السريع.
      </p>
    </form>
  )
}
