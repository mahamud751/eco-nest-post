import { Public_Sans } from "next/font/google";
import Providers from "./provider";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./globals.css";
import { Metadata } from "next";

const roboto = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Korbo Joy Admin",
  description: "Discover unique products and inspiring blogs at Korbo Joy.",
  keywords: [
    "e-commerce",
    "Korbo Joy",
    "shopping",
    "admin",
    "blogs",
    "fashion",
    "accessories",
    "medicine",
  ],
  authors: [{ name: "Mahamud Pino", url: "https://admin.korbojoy.shop" }],
  openGraph: {
    title: "Korbo Joy",
    description: "Explore a world of unique products and insightful blogs.",
    url: "https://admin.korbojoy.shop",
    siteName: "Korbo Joy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/CMkLbff/Icon.png",
        width: 800,
        height: 600,
        alt: "Korbo Joy Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
