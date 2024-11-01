"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { UserProvider } from "@/services/contexts/UserProvider";
import AppMenu from "@/components/organisms/layout/Header/AppMenu";
import { lightTheme, darkTheme } from "@/services/theme/theme";
import AnimatedImage from "@/components/atoms/AnimatedImage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "@/services/contexts/useSnackbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("dark-mode", newMode.toString());
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

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
    <Provider store={store}>
      <UserProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {pathname !== "/login" ? (
              <Suspense fallback={<div>Loading...</div>}>
                <AppMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                  {children}
                </AppMenu>
              </Suspense>
            ) : (
              children
            )}
          </ThemeProvider>
        </SnackbarProvider>
      </UserProvider>
    </Provider>
  );
}
