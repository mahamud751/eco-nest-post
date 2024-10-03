"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, Paper, IconButton } from "@mui/material";
import {
  Home,
  Settings,
  Info,
  ShoppingCart,
  ExitToApp,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import OrderDetails from "@/components/pageComponents/account/Orders";
import Wishlist from "@/components/pageComponents/account/Wishlist";
import { useAuth } from "@/services/hooks/auth";

const useStyles = makeStyles(() => ({
  tab: {
    minWidth: 150,
    textTransform: "none",
    justifyContent: "flex-start",
    "&.Mui-selected": {
      color: "#1E3A8A",
      backgroundColor: "#E0F2FE",
    },
    "&:hover": {
      backgroundColor: "#F1F5F9",
      borderRadius: "0.5rem",
    },
  },
  icon: {
    "&.home": {
      color: "#4CAF50",
    },
    "&.orders": {
      color: "#9C27B0",
    },
    "&.wishlist": {
      color: "#2196F3",
    },
    "&.feedback": {
      color: "#FF9800",
    },
  },
  logoutIcon: {
    color: "#F44336",
    marginLeft: 8,
  },
  tabLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  tabText: {
    marginLeft: 8,
  },
}));

const VerticalTabsWithIcons: React.FC = () => {
  const { logoutUser } = useAuth();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleLogOut = () => {
    logoutUser();
  };

  return (
    <Box className="container mx-auto py-10 flex gap-8">
      <Paper
        elevation={3}
        className="w-1/4 p-4 rounded-xl shadow-md border border-gray-200"
      >
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Vertical tabs"
          TabIndicatorProps={{ className: "bg-blue-900 rounded-full" }}
          className="space-y-2"
          variant="fullWidth"
        >
          <Tab
            label={
              <span className={classes.tabLabel}>
                <Home className={`${classes.icon} home`} />
                <span className={classes.tabText}>Dashboard</span>
              </span>
            }
            className={classes.tab}
          />
          <Tab
            label={
              <span className={classes.tabLabel}>
                <ShoppingCart className={`${classes.icon} orders`} />
                <span className={classes.tabText}>Orders</span>
              </span>
            }
            className={classes.tab}
          />
          <Tab
            label={
              <span className={classes.tabLabel}>
                <Settings className={`${classes.icon} wishlist`} />
                <span className={classes.tabText}>Wishlists</span>
              </span>
            }
            className={classes.tab}
          />
          <Tab
            label={
              <span className={classes.tabLabel}>
                <Info className={`${classes.icon} feedback`} />
                <span className={classes.tabText}>Feedback</span>
              </span>
            }
            className={classes.tab}
          />
        </Tabs>
        <IconButton
          className={classes.logoutIcon}
          aria-label="Logout"
          onClick={handleLogOut}
        >
          <ExitToApp />
          <span className="ms-2 text-[14px] text-gray-500">Log Out</span>
        </IconButton>
      </Paper>

      <Paper
        elevation={3}
        className="w-3/4 p-6 rounded-xl shadow-md border border-gray-200"
      >
        {selectedTab === 0 && <div>Home Content</div>}
        {selectedTab === 1 && (
          <div>
            <OrderDetails />
          </div>
        )}
        {selectedTab === 2 && (
          <div>
            <Wishlist />
          </div>
        )}
        {selectedTab === 3 && <div>Info Content</div>}
      </Paper>
    </Box>
  );
};

export default VerticalTabsWithIcons;
