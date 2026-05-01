import { MessageCircle, Phone } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { Faq, SiteSettings } from "@/lib/types"
import { buildWhatsappUrl } from "@/lib/data"

export function FaqSection({
  faqs,
  settings,
}: {
  faqs: Faq[]
  settings: SiteSettings
}) {
  if (!faqs || faqs.length === 0) return null

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  const waUrl = buildWhatsappUrl(settings.whatsapp)

  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-tight">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
              الأسئلة الشائعة
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance leading-tight">
              كل ما تحتاج معرفته <br />
              عن <span className="text-primary">رحلتك معنا</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              أجوبة مباشرة على أكثر الأسئلة شيوعاً من مسافرينا الكرام.
            </p>

            <div className="mt-8 rounded-2xl bg-primary text-primary-foreground p-6 shadow-premium">
              <div className="font-display font-bold text-lg">لم تجد إجابتك؟</div>
              <p className="text-sm opacity-85 mt-1 mb-4">
                فريق الدعم متاح على مدار الساعة لمساعدتك.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                >
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 ml-1.5" />
                    واتساب
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold"
                >
                  <a href={`tel:${settings.phone_raw}`}>
                    <Phone className="h-4 w-4 ml-1.5" />
                    اتصل بنا
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${i}`}
                  className="rounded-2xl bg-card border border-border px-5 shadow-soft data-[state=open]:shadow-premium data-[state=open]:border-primary/20 transition-all"
                >
                  <AccordionTrigger className="py-5 text-right font-bold text-base text-foreground hover:no-underline [&[data-state=open]]:text-primary">
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary font-display font-black text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-[15px] pr-10">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
