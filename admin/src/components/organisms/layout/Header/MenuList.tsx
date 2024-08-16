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
} from "@mui/icons-material";

import styles from "../../../../css/Header.module.css";

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
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleSubmenuClick = (text: string) => {
    setOpenSubmenu((prevState) => (prevState === text ? null : text));
  };

  const menuItems: MenuItem[] = [
    {
      text: "Home",
      icon: <InboxIcon />,
      path: "/",
      submenus: [],
    },
    {
      text: "Banner",
      icon: <PhotoLibraryOutlinedIcon />,
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
      text: "Category",
      icon: <CategoryIcon />,
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
      icon: <DryCleaningIcon />,
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
      icon: <Article />,
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
      icon: <PhotoLibraryOutlinedIcon />,
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
      icon: <ManageAccounts />,
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
  ];

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
