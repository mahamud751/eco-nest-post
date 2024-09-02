"use client";
import { Public_Sans } from "next/font/google";
import Providers from "./provider";
import "./globals.css";
const roboto = Public_Sans({ subsets: ["latin"] });

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
