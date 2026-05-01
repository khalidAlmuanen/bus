import { Star, Quote } from "lucide-react"
import type { Testimonial, SiteSettings } from "@/lib/types"

export function Testimonials({
  testimonials,
  settings,
}: {
  testimonials: Testimonial[]
  settings: SiteSettings
}) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" aria-hidden />

      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
            آراء عملائنا
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
            أكثر من <span className="text-primary">{settings.passengers_served}</span> مسافر
            <br className="hidden md:block" /> سعيد في رحلاتنا
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-card border border-border px-4 py-2 shadow-soft">
            <div className="flex -space-x-2 space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-black text-primary-foreground ring-2 ring-background"
                >
                  {["أ", "م", "س", "ع"][i - 1]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="font-bold text-sm text-foreground">4.9</span>
              <span className="text-xs text-muted-foreground">من 5</span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="relative rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-premium transition-shadow"
            >
              <Quote className="absolute top-5 left-5 h-10 w-10 text-accent/20" strokeWidth={1} />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed text-[15px] mb-5">
                «{t.text}»
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center font-display font-black text-primary-foreground"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.34 0.08 155) 0%, oklch(0.78 0.12 80) 100%)`,
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground leading-none">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">مسافر من {t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
