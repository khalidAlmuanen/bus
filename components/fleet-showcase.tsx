import Image from "next/image"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const SPECS = [
  "مقاعد جلدية فاخرة بوضعية استلقاء",
  "شاشة ترفيه HD لكل راكب",
  "واي فاي عالي السرعة طوال الرحلة",
  "منفذ شحن USB و220 فولت لكل مقعد",
  "نظام تكييف متطور بفلاتر هواء",
  "أنظمة سلامة أوروبية + تتبع GPS",
  "ضوء قراءة شخصي قابل للتحكم",
  "مساحة أرجل واسعة ومسند رأس قابل للتعديل",
]

export function FleetShowcase() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="/images/bus-interior.jpg"
                alt="التصميم الداخلي الفاخر لباصات الـ VIP"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-xl bg-background text-foreground px-4 py-2.5 shadow-soft">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">
                  الأسطول
                </div>
                <div className="font-display font-black text-xl leading-none">
                  40+ باص حديث
                </div>
              </div>
            </div>

            {/* Second image strip */}
            <div className="mt-4 rounded-2xl overflow-hidden shadow-premium">
              <Image
                src="/images/fleet.jpg"
                alt="أسطول الباصات الحديث في محطة الانطلاق"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-bold">
              أسطولنا الفاخر
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-balance leading-tight">
              باصات VIP مجهزة <br />
              <span className="text-accent">لأقصى درجات الراحة</span>
            </h2>
            <p className="mt-5 text-background/75 text-lg leading-relaxed">
              أسطولنا يضم أحدث الموديلات من باصات السفر الفاخر، مجهزة بأحدث
              التقنيات لتحويل رحلتك الطويلة إلى تجربة فاخرة لا تُنسى.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {SPECS.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-2.5 text-sm text-background/85"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                <Link href="/fleet">
                  استكشف الأسطول
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground font-bold"
              >
                <Link href="/trips">عرض الرحلات</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
