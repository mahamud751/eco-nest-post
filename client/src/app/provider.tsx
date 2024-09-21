"use client";

import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import ScrollToTop from "react-scroll-to-top";
import { store } from "./redux/store";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/templates/shared/Footer";
import { UserProvider } from "@/services/contexts/UserProvider";
import Navbar from "@/components/templates/shared/Navbar";
import AnimatedImage from "@/components/atoms/AnimatedImage";
import { Box } from "@mui/material";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const showHeader = pathname !== "/login" && pathname !== "/signup" && (
    <Suspense fallback={<Loading />}>
      <Navbar />
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
    <>
      <ScrollToTop
        //@ts-ignore
        height={27} // This should be fine if the component accepts a number.
        smooth
        //@ts-ignore
        width={40}
        color="#ffffff"
        style={{ background: "#000000", height: "44px", boxShadow: "none" }} // Set the background color to black
      />
      <Provider store={store}>
        <UserProvider>
          {showHeader}
          {children}
          {showHeader && <Footer />}
        </UserProvider>
      </Provider>
    </>
  );
}

function Loading() {
  return (
    <div>
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <Image
          width={120} // Correct width
          height={80} // Correct height
          src="/assets/img/black logo.png"
          alt="logo"
        />
      </div>
    </div>
  );
}
