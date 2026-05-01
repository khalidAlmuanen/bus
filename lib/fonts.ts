export async function getArabicFont() {
  const fontUrl = "https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap"
  
  // We spoof an old User-Agent to force Google Fonts to return a TTF file instead of WOFF2,
  // because Satori (Next.js OG) requires TTF or OTF fonts.
  const css = await fetch(fontUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text())

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error("Failed to extract font URL from Google Fonts CSS")
  }

  const res = await fetch(resource[1])
  if (!res.ok) {
    throw new Error("Failed to download font file")
  }

  return await res.arrayBuffer()
}
