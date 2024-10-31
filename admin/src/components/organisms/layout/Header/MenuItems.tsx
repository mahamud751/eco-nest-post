import {
  Article,
  MoveToInbox as InboxIcon,
  Category as CategoryIcon,
  DryCleaning as DryCleaningIcon,
  PhotoLibraryOutlined as PhotoLibraryOutlinedIcon,
  ManageAccounts,
  AddBusiness,
  School,
  LiveHelp,
  Pages,
  ReviewsOutlined,
  ShoppingBasketOutlined,
  Lock,
  Store,
  Sell,
  Redeem,
} from "@mui/icons-material";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  requiredPermission?: string;
  submenus: { text: string; path: string; requiredPermission?: string }[];
}

export const commonMenuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <InboxIcon className="text-green-500" />,
    path: "/",
    submenus: [],
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    text: "Permissions",
    icon: <Lock className="text-purple-600" />,
    path: "/permissions",
    requiredPermission: "permissionList",
    submenus: [
      {
        text: "Add Permissions",
        path: "/add-permission",
        requiredPermission: "permissionCreate",
      },

      {
        text: "Permissions List",
        path: "/permissions-list",
        requiredPermission: "permissionList",
      },
      {
        text: "Role Permissions",
        path: "/role-assign",
        requiredPermission: "permissionAssign",
      },
      {
        text: "User Permissions",
        path: "/user-assign",
        requiredPermission: "permissionAssign",
      },
    ],
  },
  {
    text: "B2B Stores",
    icon: <Store className="text-red-500" />,
    path: "/stores",
    requiredPermission: "storeList",
    submenus: [],
  },
  {
    text: "Order",
    icon: <ShoppingBasketOutlined className="text-purple-500" />,
    path: "/order-list",
    requiredPermission: "orderList",
    submenus: [],
  },
  {
    text: "Users",
    icon: <ManageAccounts className="text-blue-600" />,
    path: "/users",
    submenus: [
      {
        text: "Add Users",
        path: "/add-user",
        requiredPermission: "userCreate",
      },
      {
        text: "User List",
        path: "/user-list",
        requiredPermission: "userList",
      },
    ],
  },
  {
    text: "Vendors & Riders",
    icon: <AddBusiness className="text-indigo-600" />,
    path: "/vendors",
    requiredPermission: "vendorList",
    submenus: [
      {
        text: "Add Vendor & Riders",
        path: "/add-user",
        requiredPermission: "vendorRiderCreate",
      },
      {
        text: "Vendor List",
        path: "/vendor-list",
        requiredPermission: "vendorList",
      },
      {
        text: "Riders List",
        path: "/rider-list",
        requiredPermission: "riderList",
      },
      {
        text: "Vendor Request List",
        path: "/vendor-list/request-list",
        requiredPermission: "vendorRequestList",
      },
    ],
  },
  {
    text: "Product",
    icon: <DryCleaningIcon className="text-red-500" />,
    path: "/products",
    requiredPermission: "productList",
    submenus: [
      {
        text: "Add Product",
        path: "/add-product",
        requiredPermission: "productCreate",
      },
      {
        text: "Product List",
        path: "/product-list",
        requiredPermission: "productList",
      },
    ],
  },

  {
    text: "Category",
    icon: <CategoryIcon className="text-yellow-500" />,
    path: "/category",
    requiredPermission: "categoryList",
    submenus: [
      {
        text: "Add Category",
        path: "/add-category",
        requiredPermission: "categoryCreate",
      },
      {
        text: "Category List",
        path: "/category-list",
        requiredPermission: "categoryList",
      },
      {
        text: "Add SubCategory",
        path: "/add-subCategory",
        requiredPermission: "subCategoryCreate",
      },
      {
        text: "Subcategory List",
        path: "/subCategory-list",
        requiredPermission: "subCategoryList",
      },
    ],
  },
  {
    text: "Variant",
    icon: <Sell className="text-blue-600" />,
    path: "/variant",
    requiredPermission: "variantList",
    submenus: [
      {
        text: "Add Variant",
        path: "/add-variant",
        requiredPermission: "variantCreate",
      },
      {
        text: "Variant List",
        path: "/variant-list",
        requiredPermission: "variantList",
      },
    ],
  },
  {
    text: "Discount",
    icon: <Redeem className="text-pink-600" />,
    path: "/discount",
    requiredPermission: "discountList",
    submenus: [
      {
        text: "Add Discount",
        path: "/add-discount",
        requiredPermission: "discountCreate",
      },
      {
        text: "Discount List",
        path: "/discount-list",
        requiredPermission: "discountList",
      },
    ],
  },

  {
    text: "Sample Order",
    icon: <PhotoLibraryOutlinedIcon className="text-orange-500" />,
    path: "/advance",
    requiredPermission: "sampleList",
    submenus: [
      {
        text: "Add Sample",
        path: "/add-advance",
        requiredPermission: "sampleCreate",
      },
      {
        text: "Sample List",
        path: "/advance-list",
        requiredPermission: "sampleList",
      },
    ],
  },
  {
    text: "Custom Order",
    icon: <InboxIcon className="text-green-500" />,
    path: "/customOrder-list",
    requiredPermission: "customOrderList",
    submenus: [],
  },

  {
    text: "Schools",
    icon: <School className="text-gray-600" />,
    path: "/schools",
    requiredPermission: "schoolList",
    submenus: [
      {
        text: "Add School",
        path: "/add-school",
        requiredPermission: "schoolCreate",
      },
      {
        text: "School List",
        path: "/school-list",
        requiredPermission: "schoolList",
      },
    ],
  },
  {
    text: "Measurements",
    icon: <School className="text-pink-600" />,
    path: "/measurements",
    requiredPermission: "measurementList",
    submenus: [
      {
        text: "Add Measurement",
        path: "/add-measurement",
        requiredPermission: "measurementCreate",
      },
      {
        text: "Measurement List",
        path: "/measurement-list",
        requiredPermission: "measurementList",
      },
    ],
  },
  {
    text: "Banner",
    icon: <PhotoLibraryOutlinedIcon className="text-blue-500" />,
    path: "/banners",
    requiredPermission: "bannerList",
    submenus: [
      {
        text: "Add Banner",
        path: "/add-banner",
        requiredPermission: "bannerCreate",
      },
      {
        text: "Banner List",
        path: "/banner-list",
        requiredPermission: "bannerList",
      },
    ],
  },
  {
    text: "Blog",
    icon: <Article className="text-teal-500" />,
    path: "/blogs",
    requiredPermission: "blogList",
    submenus: [
      {
        text: "Add Blog",
        path: "/add-blog",
        requiredPermission: "blogCreate",
      },
      {
        text: "Blog List",
        path: "/blog-list",
        requiredPermission: "blogList",
      },
    ],
  },
  {
    text: "Faq",
    icon: <LiveHelp className="text-red-400 " />,
    path: "/faq",
    requiredPermission: "faqList",
    submenus: [
      {
        text: "Add Faq",
        path: "/add-faq",
        requiredPermission: "faqCreate",
      },
      {
        text: "Faq List",
        path: "/faq-list",
        requiredPermission: "faqList",
      },
    ],
  },
  {
    text: "Review",
    icon: <ReviewsOutlined className="text-blue-500" />,
    path: "/review-list",
    requiredPermission: "reviewList",
    submenus: [],
  },

  {
    text: "Dynamic",
    icon: <Pages className="text-sky-800 " />,
    path: "/dynamic",
    requiredPermission: "dynamicList",
    submenus: [
      {
        text: "Add Dynamic",
        path: "/add-dynamic",
        requiredPermission: "dynamicCreate",
      },
      {
        text: "Dynamic List",
        path: "/dynamic-list",
        requiredPermission: "dynamicList",
      },
    ],
  },
];
