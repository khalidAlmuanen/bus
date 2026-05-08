import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "كلمة المرور غير صحيحة" },
        { status: 401 }
      )
    }

    const cookieStore = await cookies()
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Auth API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Auth API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    return NextResponse.json({ authenticated: session?.value === "authenticated" })
  } catch (error) {
    console.error("Auth API Error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
