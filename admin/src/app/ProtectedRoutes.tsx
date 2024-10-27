import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/services/hooks/auth";
import UseFetch from "@/services/hooks/UseRequest";
import { Permission, User } from "@/services/types";
import { adminMenuItems } from "@/components/organisms/layout/Header/MenuItems";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  requiredPermission?: string;
  submenus: { text: string; path: string; requiredPermission?: string }[];
}

const createRoutePermissionsMap = (menuItems: MenuItem[]) => {
  const routePermissions: Record<string, string[]> = {};

  menuItems.forEach((item) => {
    if (item.requiredPermission) {
      routePermissions[item.path] = [item.requiredPermission];
    }
    item.submenus.forEach((submenu) => {
      if (submenu.requiredPermission) {
        routePermissions[submenu.path] = [submenu.requiredPermission];
      }
    });
  });

  return routePermissions;
};

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { data: userData, error } = UseFetch<{ data: User[] }>(
    `users?email=${user?.email}`
  );

  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const routePermissionsMap = createRoutePermissionsMap(adminMenuItems);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData && Array.isArray(userData.data) && userData.data.length > 0) {
      const permissions =
        userData.data[0].permissions?.map((perm: Permission) => perm.name) ||
        [];
      setUserPermissions(permissions);
    } else {
      setUserPermissions([]);
    }
    setIsLoading(false);
  }, [userData]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const checkPermissions = (path: string) => {
      const requiredPermissions = routePermissionsMap[path] || [];
      return requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );
    };

    if (isLoading) return;

    if (error || !checkPermissions(pathname)) {
      router.push("/");
    }
  }, [
    user,
    pathname,
    router,
    userPermissions,
    error,
    routePermissionsMap,
    isLoading,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user permissions.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
