import type { Company } from "@/lib/types"
import { Phone, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { buildWhatsappUrl } from "@/lib/data"

type Props = {
  company: Company
}

export function CompanyHeader({ company }: Props) {
  const waUrl = buildWhatsappUrl(company.whatsapp, `مرحباً، أريد الاستفسار عن رحلات شركة ${company.short_name}`)

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-28"
      style={{ 
        background: `linear-gradient(135deg, ${company.color}15 0%, ${company.color}05 100%)`,
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${company.color} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="container-wide relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة للرئيسية
        </Link>

        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div 
              className="h-24 w-24 md:h-32 md:w-32 rounded-3xl flex items-center justify-center text-white font-bold text-4xl md:text-5xl shadow-2xl"
              style={{ backgroundColor: company.color }}
            >
              {company.short_name.charAt(0)}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-5xl font-black text-foreground mb-3">
              {company.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
              {company.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2"
                style={{ backgroundColor: company.color, color: "white" }}
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  تواصل عبر واتساب
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <a href={`tel:${company.phone}`}>
                  <Phone className="h-5 w-5" />
                  اتصل الآن
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: company.color }}
      />
    </section>
  )
}
