"use client";

import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import ScrollToTop from "react-scroll-to-top";
import { Suspense, useEffect, useState } from "react";

import Footer from "@/components/templates/shared/Footer";
import { UserProvider } from "@/services/contexts/UserProvider";
import Navbar from "@/components/templates/shared/Navbar";
import AnimatedImage from "@/components/atoms/AnimatedImage";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import store from "./redux/store";
import { SnackbarProvider } from "@/services/contexts/useSnackbar";
import theme from "@/services/theme/theme";
import SessionWraper from "@/components/SessionWrapper";
import dynamic from "next/dynamic";
const CartSummary = dynamic(
  () => import("@/components/templates/shared/CartSummary"),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const showHeader = pathname !== "/login" && pathname !== "/signup" && (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <CartSummary />
    </Suspense>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="background.default"
      >
        <AnimatedImage />
      </Box>
    );
  }

  return (
    <SessionWraper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <UserProvider>
            <SnackbarProvider>
              <ScrollToTop
                // @ts-expect-error - Custom properties for ScrollToTop not typed in library
                height={27}
                smooth
                // @ts-expect-error - Custom properties for ScrollToTop not typed in library
                width={40}
                color="#ffffff"
                style={{
                  background: "#000000",
                  height: "44px",
                  boxShadow: "none",
                }}
              />

              {showHeader}
              {children}
              {showHeader && <Footer />}
            </SnackbarProvider>
          </UserProvider>
        </Provider>
      </ThemeProvider>
    </SessionWraper>
  );
}
