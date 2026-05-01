import { Search, CreditCard, BusFront, MapPinned } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    title: "ابحث عن رحلتك",
    desc: "اختر المدينة والوجهة والتاريخ وشاهد جميع الرحلات المتاحة.",
  },
  {
    icon: CreditCard,
    title: "احجز وادفع بسهولة",
    desc: "أكّد حجزك واستلم تذكرتك فوراً عبر الواتساب مع إثبات الدفع.",
  },
  {
    icon: BusFront,
    title: "اصعد إلى باصك",
    desc: "توجه إلى نقطة الانطلاق قبل 30 دقيقة من موعد الرحلة المحدد.",
  },
  {
    icon: MapPinned,
    title: "استمتع بالوصول",
    desc: "تابع مسار رحلتك وصل بأمان وراحة إلى وجهتك في الوقت المحدد.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
            كيف تحجز؟
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
            احجز تذكرتك في{" "}
            <span className="text-primary">4 خطوات</span> فقط
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            تجربة حجز سلسة ومبسطة مصممة خصيصاً لراحتك
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 inset-x-8 h-px border-t-2 border-dashed border-border" />

          <div className="grid gap-8 lg:grid-cols-4 relative">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-premium mb-5">
                  <step.icon className="h-7 w-7" strokeWidth={1.6} />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-accent text-accent-foreground font-display font-black text-sm flex items-center justify-center ring-4 ring-background">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
