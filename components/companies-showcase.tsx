import type { Company } from "@/lib/types"
import { Building2, Phone, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWhatsappUrl } from "@/lib/data"
import Link from "next/link"

type Props = {
  companies: Company[]
}

export function CompaniesShowcase({ companies }: Props) {
  return (
    <section className="py-16 md:py-20 bg-secondary/40">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
            شركات النقل البري الموثوقة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نتعاون مع أبرز شركات النقل البري بين اليمن والسعودية لضمان أفضل تجربة سفر لك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompanyCard({ company }: { company: Company }) {
  const waUrl = buildWhatsappUrl(company.whatsapp, `مرحباً، أريد الاستفسار عن رحلات شركة ${company.short_name}`)

  return (
    <div 
      className="group rounded-2xl bg-card border border-border p-6 hover:shadow-premium transition-all"
      style={{ borderTopColor: company.color, borderTopWidth: "4px" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: company.color }}
          >
            {company.short_name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">
              {company.name}
            </h3>
            <p className="text-xs text-muted-foreground">{company.short_name}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {company.description}
      </p>

      <div className="mb-4">
        <div className="text-xs font-bold text-muted-foreground mb-2">التغطية</div>
        <div className="text-sm text-foreground">{company.coverage}</div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {company.features.slice(0, 3).map((feature) => (
          <span 
            key={feature}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: company.color + "15", color: company.color }}
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            واتساب
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          className="flex-1 gap-2"
          style={{ backgroundColor: company.color, color: "white" }}
        >
          <Link href={`/companies/${company.slug}`}>
            التفاصيل
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
