import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const meta = {
  title: "London Marathon Bib Maker",
  description: "Create a custom avatar of your London Marathon race bib",
  image: `${process.env.NEXT_PUBLIC_URL}/api/og`,
}

export const metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: process.env.NEXT_PUBLIC_URL,
    siteName: meta.title,
    images: [
      {
        url: meta.image,
        width: 1024,
        height: 1024
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    creator: "@madebymh",
    images: [meta.image],
  },
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
