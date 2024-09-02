import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { UserProvider } from "@/services/contexts/UserProvider";
import AppMenu from "@/components/organisms/layout/Header/AppMenu";
import { lightTheme, darkTheme } from "@/services/theme/theme";
import Loading from "@/components/atoms/Loading";
import { useAuth } from "@/services/hooks/auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProtectedRoutes>
          {pathname !== "/login" ? (
            <Suspense fallback={<Loading />}>
              <AppMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                {children}
              </AppMenu>
            </Suspense>
          ) : (
            children
          )}
        </ProtectedRoutes>
      </ThemeProvider>
    </UserProvider>
  );
}

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
