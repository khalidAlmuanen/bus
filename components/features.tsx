import {
  Armchair,
  Wifi,
  Tv,
  Wind,
  BadgeCheck,
  Clock,
  ShieldCheck,
  Headphones,
  BatteryCharging,
  Sparkles,
  BusFront,
  UserCheck,
  BadgePercent,
  type LucideIcon,
} from "lucide-react"
import type { Feature } from "@/lib/types"

const ICON_MAP: Record<string, LucideIcon> = {
  Armchair,
  Wifi,
  Tv,
  Wind,
  BadgeCheck,
  Clock,
  ShieldCheck,
  Headphones,
  BatteryCharging,
  Sparkles,
  BusFront,
  UserCheck,
  BadgePercent,
}

export function Features({ features }: { features: Feature[] }) {
  if (!features || features.length === 0) return null

  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
            لماذا تختارنا؟
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
            تجربة سفر <span className="text-primary">لن تجدها</span> في أي مكان آخر
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            كل تفصيلة صُممت بعناية لتمنحك أعلى مستويات الراحة والأمان في رحلتك.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = ICON_MAP[f.icon] ?? BadgeCheck
            const isAccent = i % 3 === 1
            return (
              <article
                key={f.id}
                className="group relative rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={[
                    "inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5 transition-transform group-hover:scale-110",
                    isAccent ? "bg-accent/15 text-primary" : "bg-primary/10 text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
                <div className="absolute top-6 left-6 font-display font-black text-5xl text-accent/10 select-none group-hover:text-accent/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
