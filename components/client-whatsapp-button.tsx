"use client"

import { MessageCircle } from "lucide-react"
import { sendNotification } from "@/lib/data"
import { Button } from "@/components/ui/button"

type Props = {
  url: string
  text: string
  color?: string
  className?: string
}

export function ClientWhatsappButton({ url, text, color, className }: Props) {
  return (
    <Button
      asChild
      size="lg"
      className={className || "w-full mt-4 gap-2"}
      style={color ? { backgroundColor: color, color: "white" } : undefined}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-4 w-4" />
        احجز الآن
      </a>
    </Button>
  )
}
