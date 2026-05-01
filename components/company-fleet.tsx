import type { Company } from "@/lib/types"
import { Users, Bus, CheckCircle2 } from "lucide-react"

type Props = {
  company: Company
}

export function CompanyFleet({ company }: Props) {
  if (company.fleet.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
            أسطول {company.short_name}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            حافلاتنا الحديثة والمجهزة بأحدث التقنيات تضمن لك تجربة سفر مريحة وآمنة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {company.fleet.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} company={company} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FleetCard({ vehicle, company }: { vehicle: Company["fleet"][0]; company: Company }) {
  return (
    <div className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-premium transition-all">
      {/* Image */}
      <div className="aspect-video relative bg-secondary/50">
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: company.color + "10" }}
          >
            <Bus className="h-20 w-20 text-muted-foreground" />
          </div>
        )}
        
        {/* Type Badge */}
        <div 
          className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: company.color }}
        >
          {vehicle.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl font-black text-foreground mb-4">
          {vehicle.name}
        </h3>

        {/* Stats */}
        {vehicle.capacity > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">
              {vehicle.capacity} مقعد
            </span>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          {vehicle.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
