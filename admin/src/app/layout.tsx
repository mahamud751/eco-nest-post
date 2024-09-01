"use client";
import { Public_Sans } from "next/font/google";
import AppMenu from "@/components/organisms/layout/Header/AppMenu";

import "./globals.css";
import { AuthContext, UserProvider } from "@/services/contexts/UserProvider";
import { ThemeProvider } from "@emotion/react";
import theme from "@/services/theme/theme";
import { useContext } from "react";
import Providers from "./provider";

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
