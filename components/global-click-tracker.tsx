"use client"

import { useEffect } from "react"
import { sendNotification } from "@/lib/data"

export function GlobalClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (!href) return

      // Handle WhatsApp Clicks
      if (href.includes("wa.me")) {
        let details = "تواصل عبر الواتساب العام للموقع"
        try {
          const urlObj = new URL(href)
          const text = urlObj.searchParams.get("text")
          if (text) {
            // Remove the auto-appended signature to keep the Telegram message clean
            details = text.split("\n\n[المصدر:")[0]
          }
        } catch {
          // Fallback if URL parsing fails
          const textMatch = href.match(/text=([^&]+)/)
          if (textMatch) {
            details = decodeURIComponent(textMatch[1]).split("\n\n[المصدر:")[0]
          }
        }
        sendNotification("whatsapp", details)
      } 
      // Handle Phone Call Clicks
      else if (href.startsWith("tel:")) {
        const phone = href.replace("tel:", "")
        sendNotification("call", `طلب اتصال هاتفي بالرقم: ${phone}`)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
