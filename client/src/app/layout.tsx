import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import localFont from "next/font/local";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "./globals.css";
import Provider from "./provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Korbo Joy",
  description: "Discover unique products and inspiring blogs at Korbo Joy.",
  keywords: [
    "e-commerce",
    "Korbo Joy",
    "shopping",
    "blogs",
    "fashion",
    "accessories",
  ],
  authors: [{ name: "Mahamud Pino", url: "https://korbojoy.shop" }],
  openGraph: {
    title: "Korbo Joy",
    description: "Explore a world of unique products and insightful blogs.",
    url: "https://korbojoy.shop",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ prepend: true }}>
          <Provider>{children}</Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
