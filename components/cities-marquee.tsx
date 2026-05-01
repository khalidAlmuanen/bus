import { ArrowLeft } from "lucide-react"
import type { Trip } from "@/lib/types"

export function CitiesMarquee({ trips }: { trips: Trip[] }) {
  const routes =
    trips && trips.length > 0
      ? trips.map((t) => `${t.from_city} ← ${t.to_city}`)
      : [
          "صنعاء ← جدة",
          "صنعاء ← مكة المكرمة",
          "تعز ← جدة",
          "إب ← جدة",
          "المكلا ← جدة",
          "جدة ← صنعاء",
          "الرياض ← صنعاء",
          "مكة المكرمة ← صنعاء",
        ]

  const items = [...routes, ...routes]

  return (
    <section
      aria-label="خطوط الرحلات"
      className="relative border-y border-border bg-secondary/50 py-5 overflow-hidden"
    >
      <div
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary/80 to-transparent z-10 pointer-events-none"
        aria-hidden
      />
      <div className="flex gap-10 whitespace-nowrap animate-marquee">
        {items.map((r, i) => (
          <span
            key={`${r}-${i}`}
            className="inline-flex items-center gap-3 text-sm font-semibold text-foreground/70"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-accent" />
            {r}
          </span>
        ))}
      </div>
    </section>
  )
}
