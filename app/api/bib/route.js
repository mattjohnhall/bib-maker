
import { ImageResponse } from "next/og"
 
export const runtime = "edge"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const number = searchParams.has("number") ? searchParams.get("number")?.slice(0, 100) : "58336"
    const start = searchParams.has("start") ? searchParams.get("start")?.slice(0, 100) : "blue" 
    const name = searchParams.get("name")

    const themes = {
      "blue": { text: "#3D93D0", background: "#FFFFFF" },
      "green": { text: "#4CA247", background: "#FFFFFF" },
      "pink": { text: "#DD73AB", background: "#FFFFFF" },
      "red": { text: "#D22E34", background: "#FFFFFF" },
      "yellow": { text: "#D22E34", background: "#F6C85E" }
    }
    const theme = themes[start]

    const font = await fetch(`${process.env.NEXT_PUBLIC_URL}/Inter-Bold.ttf`);

    if (!font.ok) 
      throw new Error("Failed to fetch the font file")

    const fontData = await font.arrayBuffer() 

    return new ImageResponse(
      (
        <div tw="flex flex-col h-full w-full bg-white" style={{ fontFamily: `Inter, Helvetica, Arial, sans-serif` }}>
          <div tw="flex flex-row items-center justify-center px-32 py-24 w-full h-1/3 bg-black">
            <img src={`${process.env.NEXT_PUBLIC_URL}/img/tcs-lm-full.png`} alt="TCS London Marathon" tw="object-contain" />
          </div>

          <div tw="flex flex-col items-center justify-between h-[41.67%]" style={{ backgroundColor: theme.background }}>
            <div tw="flex flex-row justify-center w-full text-3xl font-bold h-8 pt-8">
              <div tw="flex flex-col items-end"><img src={`${process.env.NEXT_PUBLIC_URL}/img/tcs-lm.png`} alt="TCS London Marathon" tw="h-8" /></div> 
              <div tw="flex flex-col items-center px-8">#WeRunTogether</div>
              <div tw="flex flex-col items-start"><img src={`${process.env.NEXT_PUBLIC_URL}/img/lme.png`}alt="London Marathon Events" tw="h-8" /></div>
            </div>
 
            <div tw="flex flex-row items-center font-bold text-[18rem] uppercase tracking-tight nowrap" style={{ color: theme.text }}>
              {number}
            </div>
          </div>

          <div tw="flex items-center justify-center px-16 py-12 h-1/4 w-full bg-black text-[8rem] text-white uppercase">
            {searchParams.has("name") ? (<div>{name}</div>) : (<img src={`${process.env.NEXT_PUBLIC_URL}/img/nb.png`} alt="New Balance" tw="object-contain" />)}
          </div>
        </div>
      ),
      {
        width: 1024,
        height: 1024,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          }
        ]
      }
    )
  } catch (e) {
    return new Response(`Failed to generate bib: ${e}`, { status: 500 })
  }
}