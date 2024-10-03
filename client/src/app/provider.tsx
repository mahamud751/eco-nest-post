"use client";

import { Provider } from "react-redux";
// import { usePathname } from "next/navigation";
// import ScrollToTop from "react-scroll-to-top";

import { useEffect, useState } from "react";

import Footer from "@/components/templates/shared/Footer";
import { UserProvider } from "@/services/contexts/UserProvider";
import Navbar from "@/components/templates/shared/Navbar";
import AnimatedImage from "@/components/atoms/AnimatedImage";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import store from "./redux/store";
import { SnackbarProvider } from "@/services/contexts/useSnackbar";
import theme from "@/services/theme/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  // const pathname = usePathname();
  // const showHeader = pathname !== "/login" && pathname !== "/signup" && (
  //   <Suspense fallback={<div>Loading...</div>}>
  //     <Navbar />
  //   </Suspense>
  // );
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        {/* <ScrollToTop
          // @ts-expect-error - Custom properties for ScrollToTop not typed in library
          height={27}
          smooth
          // @ts-expect-error - Custom properties for ScrollToTop not typed in library
          width={40}
          color="#ffffff"
          style={{ background: "#000000", height: "44px", boxShadow: "none" }} // Set the background color to black
        /> */}
        <Provider store={store}>
          <UserProvider>
            <Navbar />
            {children}
            <Footer />
          </UserProvider>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
