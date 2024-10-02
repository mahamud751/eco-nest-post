"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  Collapse,
  ListItemText,
  ListItemIcon,
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
  ManageAccounts,
  AddBusiness,
  School,
} from "@mui/icons-material";

import styles from "../../../../css/Header.module.css";
import { useAuth } from "@/services/hooks/auth";

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  submenus: { text: string; path: string }[];
}

interface MenuListProps {
  open: boolean;
}

export default function MenuList({ open }: MenuListProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmenuClick = (text: string) => {
    setOpenSubmenu((prevState) => (prevState === text ? null : text));
  };

  const commonMenuItems: MenuItem[] = [
    {
      text: "Home",
      icon: <InboxIcon className="text-green-500" />,
      path: "/",
      submenus: [],
    },
    {
      text: "Banner",
      icon: <PhotoLibraryOutlinedIcon className="text-blue-500" />,
      path: "/banners",
      submenus: [
        {
          text: "Add Banner",
          path: "/add-banner",
        },
        {
          text: "Banner List",
          path: "/banner-list",
        },
      ],
    },
    {
      text: "Custom Order",
      icon: <InboxIcon className="text-purple-500" />,
      path: "/customOrder-list",
      submenus: [],
    },
  ];

  const adminMenuItems: MenuItem[] = [
    {
      text: "Category",
      icon: <CategoryIcon className="text-yellow-500" />,
      path: "/category",
      submenus: [
        {
          text: "Add Category",
          path: "/add-category",
        },
        {
          text: "Category List",
          path: "/category-list",
        },
        {
          text: "Add SubCategory",
          path: "/add-subCategory",
        },
        {
          text: "Subcategory List",
          path: "/subCategory-list",
        },
      ],
    },
    {
      text: "Product",
      icon: <DryCleaningIcon className="text-red-500" />,
      path: "/products",
      submenus: [
        {
          text: "Add Product",
          path: "/add-product",
        },
        {
          text: "Product List",
          path: "/product-list",
        },
      ],
    },
    {
      text: "Blog",
      icon: <Article className="text-teal-500" />,
      path: "/blogs",
      submenus: [
        {
          text: "Add Blog",
          path: "/add-blog",
        },
        {
          text: "Blog List",
          path: "/blog-list",
        },
      ],
    },
    {
      text: "Advance Order",
      icon: <PhotoLibraryOutlinedIcon className="text-orange-500" />,
      path: "/advance",
      submenus: [
        {
          text: "Add Advance",
          path: "/add-advance",
        },
        {
          text: "Advance List",
          path: "/advance-list",
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
        },
        {
          text: "User List",
          path: "/user-list",
        },
      ],
    },
    {
      text: "Vendors",
      icon: <AddBusiness className="text-indigo-600" />,
      path: "/vendors",
      submenus: [
        {
          text: "Add Vendor",
          path: "/add-user",
        },
        {
          text: "Vendor List",
          path: "/vendor-list",
        },
      ],
    },
    {
      text: "Schools",
      icon: <School className="text-gray-600" />,
      path: "/schools",
      submenus: [
        {
          text: "Add School",
          path: "/add-school",
        },
        {
          text: "School List",
          path: "/school-list",
        },
      ],
    },
    {
      text: "Measurements",
      icon: <School className="text-pink-600" />,
      path: "/measurements",
      submenus: [
        {
          text: "Add Measurement",
          path: "/add-measurement",
        },
        {
          text: "Measurement List",
          path: "/measurement-list",
        },
      ],
    },
    {
      text: "Faq",
      icon: <School className="text-orange-600" />,
      path: "/faq",
      submenus: [
        {
          text: "Add Faq",
          path: "/add-faq",
        },
        {
          text: "Faq List",
          path: "/faq-list",
        },
      ],
    },
  ];

  const menuItems = isClient
    ? [
        ...commonMenuItems,
        ...(user?.role === "superAdmin" ? adminMenuItems : []),
      ]
    : commonMenuItems;

  return (
    <List className={styles.sidebar}>
      {menuItems.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              className={styles.listItemButton}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                if (item.submenus.length > 0) {
                  handleSubmenuClick(item.text);
                } else {
                  router.push(item.path);
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
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
                {item.submenus.map((subItem) => (
                  <ListItem key={subItem.text} className={styles.submenuItem}>
                    <ListItemButton
                      className={styles.submenuItemButton}
                      onClick={() => router.push(subItem.path)}
                      sx={{ pl: 8, py: 0.5 }}
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
}
