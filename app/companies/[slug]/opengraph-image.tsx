import { ImageResponse } from "next/og"
import { getArabicFont } from "@/lib/fonts"
import { getCompanyBySlug } from "@/lib/queries"

export const runtime = "nodejs"
export const alt = "حجز تذاكر باصات"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image(props: { params: Promise<{ slug: string }> | { slug: string } }) {
  const params = await props.params
  const slug = params.slug || ""
  
  const cairoFont = await getArabicFont()
  const company = await getCompanyBySlug(slug)

  const companyName = company ? company.name : "تذكرة سفر"
  const color = company ? company.color : "#3b82f6"

  const rtl = (text: string) => text.split(" ").reverse().join(" ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020817",
          fontFamily: "Cairo",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 50% 50%, ${color}40 0%, #020817 100%)`,
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: "#fbbf24",
              marginBottom: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px 40px",
              border: "2px solid #fbbf24",
              borderRadius: "50px",
              backgroundColor: "rgba(251, 191, 36, 0.1)",
            }}
          >
            {rtl("وكيل معتمد للحجز")}
          </div>
          
          <div
            style={{
              fontSize: 90,
              color: "white",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {rtl(companyName)}
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#94a3b8",
              marginTop: 60,
              display: "flex",
              flexDirection: "row-reverse",
              gap: "30px",
            }}
          >
            <span>{rtl("احجز تذكرتك الآن")}</span>
            <span style={{ color }}>•</span>
            <span>{rtl("أسعار رسمية")}</span>
            <span style={{ color }}>•</span>
            <span>{rtl("دفع آمن")}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cairo",
          data: cairoFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
