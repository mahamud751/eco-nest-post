"use client";
import { Public_Sans } from "next/font/google";
import AppMenu from "@/components/organisms/layout/Header/AppMenu";

import "./globals.css";
import { UserProvider } from "@/services/contexts/UserProvider";
import { ThemeProvider } from "@emotion/react";
import theme from "@/services/theme/theme";

const roboto = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={roboto.className}>
          <UserProvider>
            {" "}
            <AppMenu children={children} />
          </UserProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
