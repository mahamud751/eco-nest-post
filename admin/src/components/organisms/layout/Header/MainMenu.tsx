import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  Collapse,
  ListItemText,
  ListItemIcon,
  Box,
  SwipeableDrawer,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  Article,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  MoveToInbox as InboxIcon,
  Circle as CircleIcon,
  Category as CategoryIcon,
  DryCleaning as DryCleaningIcon,
  PhotoLibraryOutlined as PhotoLibraryOutlinedIcon,
  Menu as MenuIcon,
  ManageAccounts,
  AddBusiness,
  School,
  LiveHelp,
  Pages,
  ReviewsOutlined,
  ShoppingBasketOutlined,
  Lock,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "@/services/hooks/auth";
import styles from "../../../../css/Header.module.css";
import UseFetch from "@/services/hooks/UseRequest";
import { Permission, User } from "@/services/types";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  requiredPermission?: string;
  submenus: { text: string; path: string; requiredPermission?: string }[];
}

interface UnifiedMenuProps {
  isDrawer?: boolean;
}

const UnifiedMenu: React.FC<UnifiedMenuProps> = ({ isDrawer = false }) => {
  const { user } = useAuth();
  const { data: userData } = UseFetch<{ data: User[] }>(
    `users?email=${user?.email}`
  );
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmenuClick = (text: string) => {
    setOpenSubmenu((prevState) => (prevState === text ? null : text));
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const userPermissions = userData?.data?.[0]?.permissions
    ? userData.data[0].permissions.map((perm: Permission) => perm.name)
    : [];

  const hasPermission = (requiredPermission?: string) => {
    return requiredPermission
      ? userPermissions.includes(requiredPermission)
      : true;
  };

  const commonMenuItems: MenuItem[] = [
    {
      text: "Home",
      icon: <InboxIcon className="text-green-500" />,
      path: "/",
      submenus: [],
    },
  ];

  const adminMenuItems: MenuItem[] = [
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
      text: "Custom Order",
      icon: <InboxIcon className="text-purple-500" />,
      path: "/customOrder-list",
      requiredPermission: "customOrderList",
      submenus: [],
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
          text: "Permissions Assign",
          path: "/permission-assign",
          requiredPermission: "permissionAssign",
        },
        {
          text: "Permissions List",
          path: "/permissions-list",
          requiredPermission: "permissionList",
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
      text: "Order",
      icon: <ShoppingBasketOutlined className="text-purple-500" />,
      path: "/order-list",
      requiredPermission: "orderList",
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

  const filteredMenuItems = (menuItems: MenuItem[]) =>
    menuItems.filter(
      (item) =>
        hasPermission(item.requiredPermission) &&
        (!item.submenus.length ||
          item.submenus.some((submenu) =>
            hasPermission(submenu.requiredPermission)
          ))
    );

  const menuItems = isClient
    ? [
        ...commonMenuItems,
        ...(user?.role === "superAdmin" ||
        user?.role === "vendor" ||
        user?.role === "schoolManger" ||
        user?.role === "rider"
          ? filteredMenuItems(adminMenuItems)
          : []),
      ]
    : commonMenuItems;

  const renderMenuItems = () => (
    <List
      className={styles.sidebar}
      sx={{
        overflowY: "auto",
        maxHeight: "90vh",
        width: 240,
        padding: 0,
        margin: 0,
        listStyle: "none",
        "&::-webkit-scrollbar": {
          width: "8px",
          background: theme.palette.mode === "dark" ? "#1f1f1f" : "#f0f0f0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#e0e0e0" : "#4a4a4a",
        },
      }}
    >
      {isDrawer && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Image
            src={"https://i.ibb.co/CMkLbff/Icon.png"}
            width={20}
            height={20}
            alt="icon"
            className="ml-2"
          />

          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {menuItems.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              className={styles.listItemButton}
              onClick={() => {
                if (item.submenus.length > 0) {
                  handleSubmenuClick(item.text);
                } else {
                  router.push(item.path);
                  setDrawerOpen(false);
                }
              }}
              sx={{ minHeight: 48, justifyContent: "center", px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: 1 }} />
              {item.submenus.length > 0 &&
                (openSubmenu === item.text ? (
                  <ExpandLess />
                ) : (
                  <KeyboardArrowRightIcon />
                ))}
            </ListItemButton>
          </ListItem>
          {item.submenus.length > 0 && (
            <Collapse
              in={openSubmenu === item.text}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.submenus
                  .filter((subItem) =>
                    hasPermission(subItem.requiredPermission)
                  )
                  .map((subItem) => (
                    <ListItem key={subItem.text}>
                      <ListItemButton
                        onClick={() => {
                          router.push(subItem.path);
                          setDrawerOpen(false);
                        }}
                        sx={{ pl: 8 }}
                      >
                        <CircleIcon className="text-[6px] mx-2" />
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  return isDrawer ? (
    <>
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
        className={`relative flex items-center justify-center flex-shrink-0 font-sans 
              cursor-pointer rounded-md w-[34px] h-[34px] 
              text-[1.2rem] overflow-hidden transition-transform 
              duration-200 ease-in-out 
            `}
        sx={{
          color: theme.palette.mode === "dark" ? "white" : "purple",
          "&:hover": {
            background: "transparent",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: 350 }}>{renderMenuItems()}</Box>
      </SwipeableDrawer>
    </>
  ) : (
    <Box sx={{ width: 350 }}>{renderMenuItems()}</Box>
  );
};

export default UnifiedMenu;
