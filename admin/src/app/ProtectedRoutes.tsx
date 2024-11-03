import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  const routePermissionsMap = createRoutePermissionsMap(adminMenuItems);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const permissions =
        user.permissions?.map((perm: { name: string }) => perm.name) || [];
      setUserPermissions(permissions);
    } else {
      setUserPermissions([]);
    }
    setLoading(false);
  }, [token, router]);

  const checkPermissions = (path: string) => {
    const requiredPermissions = routePermissionsMap[path] || [];
    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  };

  if (loading) {
    return null;
  }

  if (!checkPermissions(pathname)) {
    return <div>No Access</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
