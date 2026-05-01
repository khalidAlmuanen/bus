import type { Company } from "@/lib/types"
import * as Icons from "lucide-react"
import { MapPin, Building2 } from "lucide-react"

type Props = {
  company: Company
}

export function CompanyAbout({ company }: Props) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* About Text */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-6">
              عن {company.short_name}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {company.about}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div 
                  className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: company.color + "15" }}
                >
                  <MapPin className="h-5 w-5" style={{ color: company.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">التغطية</h3>
                  <p className="text-muted-foreground">{company.coverage}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: company.color + "15" }}
                >
                  <Building2 className="h-5 w-5" style={{ color: company.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">المميزات الرئيسية</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {company.features.map((feature) => (
                      <span 
                        key={feature}
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold"
                        style={{ backgroundColor: company.color + "15", color: company.color }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-display text-2xl font-black text-foreground mb-6">
              ميزات الحافلات
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {company.amenities.map((amenity) => {
                const Icon = Icons[amenity.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
                return (
                  <div 
                    key={amenity.label}
                    className="rounded-2xl bg-card border border-border p-5 hover:shadow-premium transition-all"
                  >
                    <div 
                      className="h-12 w-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: company.color + "15" }}
                    >
                      {Icon && <Icon className="h-6 w-6" style={{ color: company.color }} />}
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{amenity.label}</h4>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
