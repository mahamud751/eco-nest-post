"use client";

import { UserProvider } from "@/services/contexts/UserProvider";
import { usePathname } from "next/navigation";

import { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
