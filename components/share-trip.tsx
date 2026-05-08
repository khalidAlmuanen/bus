"use client"

import { useState } from "react"
import { Share2, Copy, Check, MessageCircle, Twitter, Facebook, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareTripProps {
  fromCity: string
  toCity: string
  price?: number
  company?: string
  className?: string
}

function buildShareUrl(medium: string, fromCity: string, toCity: string) {
  const base = typeof window !== "undefined" ? window.location.origin : "https://tazkatsafar.com"
  const utm = `?utm_source=share&utm_medium=${medium}&utm_campaign=trip_share&utm_content=${encodeURIComponent(fromCity + "-" + toCity)}`
  return base + "/trips" + utm
}

function buildShareText(fromCity: string, toCity: string, price?: number, company?: string) {
  let text = `🚌 رحلة ${fromCity} ← ${toCity}`
  if (company) text += ` | ${company}`
  if (price) text += ` | ${price} ر.س`
  text += `\n\nاحجز تذكرتك الآن من تذكرة سفر ⬇️`
  return text
}

export function ShareTrip({ fromCity, toCity, price, company, className }: ShareTripProps) {
  const [copied, setCopied] = useState(false)

  const shareText = buildShareText(fromCity, toCity, price, company)

  const handleWhatsApp = () => {
    const url = buildShareUrl("whatsapp", fromCity, toCity)
    const text = encodeURIComponent(shareText + "\n" + url)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handleTelegram = () => {
    const url = buildShareUrl("telegram", fromCity, toCity)
    const text = encodeURIComponent(shareText)
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, "_blank")
  }

  const handleTwitter = () => {
    const url = buildShareUrl("twitter", fromCity, toCity)
    const text = encodeURIComponent(shareText)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank")
  }

  const handleFacebook = () => {
    const url = buildShareUrl("facebook", fromCity, toCity)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const handleCopy = async () => {
    const url = buildShareUrl("copy", fromCity, toCity)
    const fullText = shareText + "\n" + url
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement("textarea")
      textarea.value = fullText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 text-muted-foreground hover:text-primary ${className || ""}`}
          suppressHydrationWarning
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline text-xs font-semibold">مشاركة</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleWhatsApp} className="gap-3 cursor-pointer">
          <MessageCircle className="h-4 w-4 text-green-500" />
          <span className="font-semibold">واتساب</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTelegram} className="gap-3 cursor-pointer">
          <Send className="h-4 w-4 text-blue-500" />
          <span className="font-semibold">تيليجرام</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitter} className="gap-3 cursor-pointer">
          <Twitter className="h-4 w-4 text-sky-500" />
          <span className="font-semibold">تويتر</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebook} className="gap-3 cursor-pointer">
          <Facebook className="h-4 w-4 text-blue-600" />
          <span className="font-semibold">فيسبوك</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy} className="gap-3 cursor-pointer">
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="font-semibold">{copied ? "تم النسخ!" : "نسخ الرابط"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
