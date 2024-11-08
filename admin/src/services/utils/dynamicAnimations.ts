import dynamic from "next/dynamic";

export const SuperAdminAnimation = dynamic(
  () => import("@/components/dynamics/animations/SuperAdminAnimation"),
  { ssr: false }
);

export const EducAnimation = dynamic(
  () => import("@/components/dynamics/animations/EducAnimation"),
  { ssr: false }
);

export const VendorAnimation = dynamic(
  () => import("@/components/dynamics/animations/VendorAnimation"),
  { ssr: false }
);

export const RiderAnimation = dynamic(
  () => import("@/components/dynamics/animations/RiderAnimation"),
  { ssr: false }
);

export const B2BMangerAnimation = dynamic(
  () => import("@/components/dynamics/animations/B2BMangerAnimation"),
  { ssr: false }
);

export const UserAnimation = dynamic(
  () => import("@/components/dynamics/animations/UserAnimation"),
  { ssr: false }
);

export const ManagerAnimation = dynamic(
  () => import("@/components/dynamics/animations/ManagerAnimation"),
  { ssr: false }
);

export const AdminAnimation = dynamic(
  () => import("@/components/dynamics/animations/AdminAnimation"),
  { ssr: false }
);

export const NotFoundAnimation = dynamic(
  () => import("@/components/dynamics/animations/NotFoundAnimation"),
  { ssr: false }
);

export const SuccessAnimation = dynamic(
  () => import("@/components/dynamics/animations/SuccessAnimation"),
  { ssr: false }
);
