import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, details } = body

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // If environment variables are not set, just return success (don't break the app)
    if (!botToken || !chatId) {
      console.warn("Telegram Bot Token or Chat ID is missing. Notification skipped.")
      return NextResponse.json({ success: true, warning: "Credentials missing" })
    }

    const timestamp = new Intl.DateTimeFormat('ar-SA', {
      timeZone: 'Asia/Riyadh',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date())

    let messageText = `🚨 *تنبيه حجز جديد*\n\n`
    messageText += `👤 عميل يتوجه الآن للتواصل عبر *${action === "whatsapp" ? "الواتساب" : "الاتصال"}*\n\n`
    
    if (details) {
      messageText += `📋 *التفاصيل:*\n${details}\n\n`
    }
    
    messageText += `🕒 *الوقت:* ${timestamp}`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API Error:", errorData)
      return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notify API Error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
