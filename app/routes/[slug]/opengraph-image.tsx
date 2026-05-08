import { ImageResponse } from "next/og"
import { getArabicFont } from "@/lib/fonts"

export const runtime = "nodejs"
export const alt = "رحلات النقل البري"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image(props: { params: Promise<{ slug: string }> | { slug: string } }) {
  const params = await props.params
  const slug = params.slug || ""

  const cairoFont = await getArabicFont()

  const [fromEng, toEng] = slug.split("-to-")

  const cityMap: Record<string, string> = {
    sanaa: "صنعاء",
    aden: "عدن",
    taiz: "تعز",
    ibb: "إب",
    mukalla: "المكلا",
    seiyun: "سيئون",
    marib: "مأرب",
    makkah: "مكة المكرمة",
    jeddah: "جدة",
    riyadh: "الرياض",
    dammam: "الدمام",
    madinah: "المدينة المنورة",
    khamis: "خميس مشيط",
    jizan: "جيزان",
    tabuk: "تبوك",
  }

  const fromCity = cityMap[fromEng] || fromEng
  const toCity = cityMap[toEng] || toEng

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
            backgroundImage: "radial-gradient(circle at 50% 50%, #1e3a8a 0%, #020817 100%)",
            opacity: 0.3,
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
              color: "#60a5fa",
              marginBottom: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px 40px",
              border: "2px solid #3b82f6",
              borderRadius: "50px",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
            }}
          >
            {rtl("تذكرة سفر")}
          </div>
          
          <div
            style={{
              fontSize: 90,
              color: "white",
              fontWeight: 700,
              display: "flex",
              flexDirection: "row-reverse", // Fixes Arabic RTL layout in Flex
              alignItems: "center",
              gap: "24px",
            }}
          >
            <span style={{ color: "white" }}>{rtl("من")}</span>
            <span style={{ color: "#fbbf24" }}>{rtl(fromCity)}</span>
            <span style={{ color: "white" }}>{rtl("إلى")}</span>
            <span style={{ color: "#fbbf24" }}>{rtl(toCity)}</span>
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
            <span>{rtl("أفضل الأسعار")}</span>
            <span style={{ color: "#3b82f6" }}>•</span>
            <span>{rtl("حجز فوري")}</span>
            <span style={{ color: "#3b82f6" }}>•</span>
            <span>{rtl("شركات معتمدة")}</span>
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
