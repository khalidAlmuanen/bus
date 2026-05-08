"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Ticket,
  DollarSign,
  LogOut,
  Bus,
  Menu,
  X,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "الحجوزات", icon: Ticket },
  { href: "/admin/commissions", label: "العمولات", icon: DollarSign },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        setAuthenticated(true)
      } else {
        setError(data.error || "حدث خطأ")
      }
    } catch {
      setError("تعذر الاتصال بالخادم")
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" })
    setAuthenticated(false)
    router.push("/admin")
  }

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Bus className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display font-black text-2xl text-foreground">
              لوحة التحكم
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              أدخل كلمة المرور للدخول
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                dir="ltr"
                autoFocus
              />
            </div>
            {error && (
              <div className="rounded-lg bg-destructive/10 text-destructive text-sm px-3 py-2 text-center">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" className="w-full font-bold">
              دخول
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center mt-6">
            كلمة المرور الافتراضية: admin123 (غيّرها عبر ADMIN_PASSWORD في .env)
          </p>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-card border-l border-border transform transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Bus className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">لوحة التحكم</div>
                <div className="text-[11px] text-muted-foreground">بوابة الحجز</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors mb-1"
            >
              <Bus className="h-4.5 w-4.5" />
              الموقع الرئيسي
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors w-full"
            >
              <LogOut className="h-4.5 w-4.5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-9 w-9 rounded-lg bg-secondary flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-sm text-muted-foreground">
            مرحباً بك في لوحة التحكم
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
