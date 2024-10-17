"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  DarkMode,
  LightMode,
  Language,
  ShoppingCart,
  Notifications,
} from "@mui/icons-material";
import { useTheme, styled, Theme, CSSObject } from "@mui/material/styles";

import UnifiedMenu from "./MainMenu";
import ProfileMenu from "./ProfileMenu";
import LanguageModal from "../AllHeaderModal/Language";
import CartModal from "../AllHeaderModal/CartModal";
import NotificationModal from "../AllHeaderModal/Notification";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  margin: "10px 10px",
  transition: theme.transitions.create(["margin-left", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: `calc(100% - ${open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`
    })`,
  height: "100vh",
}));

interface AppMenuProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function AppMenu({
  children,
  darkMode,
  toggleDarkMode,
}: AppMenuProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isSmallScreen);
  const [openLanguageModal, setOpenLanguageModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(
    null
  );
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://i.ibb.co.com/Sx1t5ZZ/2024-Luxury-Clothing-Men-s-Genuine-Linen-Shirt-Man-Shirts-High-Quality-Fashion-Blouses-Social-T-jpg.jpg",
      name: "Item 1",
      price: 10,
      quantity: 1,
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/d6rGWKR/product-3-1.jpg",
      name: "Item 2",
      price: 20,
      quantity: 2,
    },
  ]);
  const handleToggleCartModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenCartModal((prev) => !prev);
  };
  const handleLanguageModalOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget);
    setOpenLanguageModal((prev) => !prev);
  };
  const handleNotificationModalOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElNotification(event.currentTarget);
    setOpenNotificationModal((prev) => !prev);
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Box className="flex" sx={{ height: "100vh", margin: 0 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-white shadow-none">
        <Toolbar>
          {isSmallScreen && <UnifiedMenu isDrawer />}
          {!isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={`relative flex items-center justify-center flex-shrink-0 font-sans 
              bg-purple-50 cursor-pointer rounded-md w-[34px] h-[34px] 
              text-[1.2rem] overflow-hidden transition-transform 
              duration-200 ease-in-out text-purple-700 
              ${open ? "hidden" : "block"}`}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
              style={{ marginLeft: 40 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="flex justify-end w-full">
            <IconButton
              onClick={handleLanguageModalOpen}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <Language />
            </IconButton>
            <IconButton
              onClick={handleToggleCartModal}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <ShoppingCart />
            </IconButton>
            <IconButton
              onClick={handleNotificationModalOpen}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <Notifications />
            </IconButton>
            <IconButton
              onClick={toggleDarkMode}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginRight: 8,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            <ProfileMenu />

            <LanguageModal
              open={openLanguageModal}
              onClose={() => {
                setOpenLanguageModal(false);
                setAnchorElLanguage(null);
              }}
              anchorEl={anchorElLanguage}
            />
            <CartModal
              open={openCartModal}
              anchorEl={anchorEl}
              onClose={() => setOpenCartModal(false)}
              cartItems={cartItems}
              onRemoveItem={handleRemoveItem}
            />
            <NotificationModal
              open={openNotificationModal}
              onClose={() => setOpenNotificationModal(false)}
              anchorEl={anchorElNotification}
            />
          </div>
        </Toolbar>
      </AppBar>
      {!isSmallScreen && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="flex justify-between p-4">
            <Image
              src={"https://i.ibb.co/CMkLbff/Icon.png"}
              width={20}
              height={20}
              alt="icon"
              className="ml-2"
            />
            <div className="flex items-center">
              <IconButton
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                sx={{
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                {open ? (
                  <MenuIcon
                    className={`relative flex items-center justify-center flex-shrink-0 font-sans cursor-pointer rounded-md w-[24px] h-[34px] 
                    text-[1.2rem] overflow-hidden transition-transform duration-200 ease-in-out
                    ${theme.palette.mode === "dark"
                        ? "bg-transparent text-white"
                        : "bg-purple-50 text-purple-700"
                      }`}
                  />
                ) : (
                  <ChevronRightIcon
                    className={
                      theme.palette.mode === "dark" ? "text-white" : ""
                    }
                  />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />
          {!isSmallScreen && <UnifiedMenu isDrawer={false} />}
        </Drawer>
      )}
      <MainContent open={open}>
        <DrawerHeader />
        {children}
      </MainContent>
    </Box>
  );
}
