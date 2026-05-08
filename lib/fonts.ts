import { readFile } from "fs/promises"
import { join } from "path"

let cachedFont: ArrayBuffer | null = null

export async function getArabicFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont

  const fontPath = join(process.cwd(), "public", "Cairo-Bold.ttf")
  const buffer = await readFile(fontPath)
  cachedFont = buffer.buffer as ArrayBuffer
  return cachedFont
}
