"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"
import type { Trip, Company } from "@/lib/types"

type Props = {
  trip: Trip
  company: Company
  className?: string
  size?: "sm" | "lg" | "default"
  variant?: "default" | "outline"
}

export function BookNowButton({
  trip,
  company,
  className,
  size = "default",
  variant = "default",
}: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button
        asChild={false}
        size={size}
        variant={variant}
        className={className || "w-full mt-4 gap-2"}
        style={
          variant === "default"
            ? { backgroundColor: company.color, color: "white" }
            : undefined
        }
        onClick={() => setModalOpen(true)}
      >
        <MessageCircle className="h-4 w-4" />
        احجز الآن
      </Button>

      <BookingModal
        trip={trip}
        company={company}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
