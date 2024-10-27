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
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Circle as CircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "@/services/hooks/auth";
import styles from "../../../../css/Header.module.css";
import UseFetch from "@/services/hooks/UseRequest";
import { Permission, User } from "@/services/types";
import { adminMenuItems, commonMenuItems } from "./MenuItems";

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
