import { ShieldCheck, HandCoins, Headphones, Timer } from "lucide-react"

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "ضمان السلامة",
    desc: "جميع باصاتنا مجهزة بأنظمة سلامة متقدمة وتخضع لصيانة دورية صارمة.",
  },
  {
    icon: HandCoins,
    title: "أسعار واضحة",
    desc: "لا رسوم خفية. السعر الذي تراه هو السعر الذي تدفعه، بدون مفاجآت.",
  },
  {
    icon: Timer,
    title: "التزام بالمواعيد",
    desc: "دقة في الانطلاق والوصول. وقتك عندنا أمانة نلتزم بها دائماً.",
  },
  {
    icon: Headphones,
    title: "دعم على مدار الساعة",
    desc: "فريقنا متاح 24/7 للإجابة على استفساراتك ومساعدتك في أي وقت.",
  },
]

export function TrustGuarantees() {
  return (
    <section className="py-16 md:py-20 bg-background border-t border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <g.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-foreground">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
