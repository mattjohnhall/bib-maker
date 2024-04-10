import { ImageResponse } from "next/og"
 
export const runtime = "edge"

export async function GET(request) {
  try {

    return new ImageResponse(
      (
        <div tw="flex flex-col items-center justify-center p-8 w-full h-full bg-gray-100">
          <img src={`${process.env.NEXT_PUBLIC_URL}/api/bib`} alt="" tw="shadow-xl w-128 h-128" />
        </div>
      )
    )
  } catch (e) {
    return new Response(`Failed to generate bib: ${e}`, { status: 500 })
  }
}