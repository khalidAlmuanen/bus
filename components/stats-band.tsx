import type { Stat } from "@/lib/types"

export function StatsBand({ stats }: { stats: Stat[] }) {
  if (!stats || stats.length === 0) return null

  return (
    <section
      aria-label="أرقام تتحدث عنا"
      className="relative py-14 bg-primary text-primary-foreground overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="container-wide relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((s) => (
            <div
              key={s.id}
              className="text-center border-r-0 md:border-r md:last:border-r-0 md:border-primary-foreground/15 md:px-4 first:border-r-0"
            >
              <div className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-accent leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-sm md:text-base font-semibold opacity-90">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
