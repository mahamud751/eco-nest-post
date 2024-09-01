import React, { Suspense, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import { UserProvider } from "@/services/contexts/UserProvider"; // Ensure UserProvider is imported
import AppMenu from "@/components/organisms/layout/Header/AppMenu";
import theme from "@/services/theme/theme";
import Loading from "@/components/atoms/Loading";
import { useAuth } from "@/services/hooks/auth";
export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <ProtectedRoutes>
          {pathname !== "/login" ? (
            <Suspense fallback={<Loading />}>
              <AppMenu>{children}</AppMenu>
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
