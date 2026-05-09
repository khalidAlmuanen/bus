import type { Metadata, Viewport } from "next"
import { Cairo, Tajawal } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { GlobalClickTracker } from "@/components/global-click-tracker"
import { BookingNotifications } from "@/components/booking-notifications"
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
})

const siteUrl = "https://bus-booking.com"

export const metadata: Metadata = {
  metadataBase: new URL("https://bus-booking-portal.vercel.app"),
  title: {
    default: "تذكرة سفر | رحلات اليمن والسعودية",
    template: "%s | تذكرة سفر",
  },
  description:
    "دليلك الأول لحجز رحلات النقل البري بين اليمن والسعودية. قارن الأسعار، واعرف المواعيد، واحجز تذكرتك عبر أفضل الشركات مثل الكاهلي، البركة، المتصدر، مشوار، المتحدة، الريادة والمزيد.",
  keywords: [
    "شركة مشوار", "باصات مشوار",
    "شركة المتحدة", "شركة الريادة",
    
    // المدن والمسارات
    "حجز باص من صنعاء الى جدة", "باصات صنعاء الرياض", "باصات صنعاء مكة", "باصات صنعاء الدمام",
    "حجز باص من عدن الى جدة", "باصات عدن الرياض", "باصات عدن مكة",
    "حجز باص من تعز الى جدة", "باصات تعز الرياض", "باصات تعز الدمام",
    "حجز باص من إب الى جدة", "باصات إب الرياض",
    "حجز باص من المكلا الى جدة", "باصات المكلا الرياض", "باصات المكلا الدمام",
    "باصات جدة صنعاء", "باصات الرياض صنعاء", "باصات مكة صنعاء", "باصات الدمام عدن",
    
    // كلمات أخرى متعلقة بالسفر والمغتربين
    "تأشيرة زيارة عائلية باص", "سفر المغتربين اليمن", "باصات عمرة", "رحلات عمرة برية",
    "تخليص جمركي الوديعة", "استعلامات باصات اليمن", "مكاتب حجز باصات صنعاء"
  ],
  applicationName: "تذكرة سفر",
  authors: [{ name: "تذكرة سفر" }],
  creator: "تذكرة سفر",
  publisher: "تذكرة سفر",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: "/",
    languages: {
      "ar-YE": "/",
      "ar-SA": "/",
      ar: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_YE",
    alternateLocale: ["ar_SA", "ar"],
    url: siteUrl,
    siteName: "تذكرة سفر",
    title: "تذكرة سفر | حجز رحلات اليمن - السعودية",
    description:
      "الحجز الذكي لأفضل باصات النقل البري بين اليمن والسعودية. مقارنة الأسعار، باصات VIP فاخرة، أمان، مواعيد دقيقة.",
    images: [
      {
        url: "/images/hero-bus.jpg",
        width: 1200,
        height: 630,
        alt: "باصات النقل البري الفاخرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تذكرة سفر | حجز رحلات اليمن - السعودية",
    description: "مقارنة الأسعار، باصات VIP فاخرة، حجز سريع وآمن، خدمة 24/7.",
    images: ["/images/hero-bus.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Travel",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1628" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "تذكرة سفر",
  alternateName: ["Bus Booking Portal", "Yemen Saudi Bus Booking"],
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/images/hero-bus.jpg`,
  description:
    "تذكرة سفر - خدمات حجز باصات VIP بين اليمن والمملكة العربية السعودية مع أفضل شركات النقل.",
  address: {
    "@type": "PostalAddress",
    addressCountry: ["YE", "SA"],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+967777192477",
      contactType: "customer service",
      availableLanguage: ["Arabic", "ar"],
      areaServed: ["YE", "SA"],
    },
  ],
  sameAs: [],
  areaServed: [
    { "@type": "Country", name: "Yemen" },
    { "@type": "Country", name: "Saudi Arabia" },
  ],
}

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "تذكرة سفر",
  url: siteUrl,
  telephone: "+967777192477",
  priceRange: "$$",
  image: `${siteUrl}/images/hero-bus.jpg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: ["YE", "SA"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Saturday", "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased leading-arabic" suppressHydrationWarning>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <BookingNotifications />
        <GlobalClickTracker />
      </body>
    </html>
  )
}
