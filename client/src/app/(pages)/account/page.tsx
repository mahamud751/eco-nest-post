"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  Settings,
  Info,
  ShoppingCart,
  PowerSettingsNew,
  Notifications,
  AccountCircle,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import OrderDetails from "@/components/pageComponents/account/Orders";
import Wishlist from "@/components/pageComponents/account/Wishlist";
import { useAuth } from "@/services/hooks/auth";
import Feedback from "@/components/pageComponents/account/Feedback";
import Dashboard from "@/components/pageComponents/account/Dashboard";
import NotificationTab from "@/components/pageComponents/account/NotificationTab";
import ProfileTab from "@/components/pageComponents/account/ProfileTab";

const StyledTab = styled(Tab)(({}) => ({
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
}));

const StyledIconButton = styled(IconButton)(({}) => ({
  color: "#F44336",
  marginLeft: 8,
}));

const StyledTabLabel = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

const StyledTabText = styled("span")({
  marginLeft: 8,
});

const StyledIcon = styled("span")(({ theme, color }) => ({
  color: color || theme.palette.text.primary,
}));

const Account: React.FC = () => {
  const { user, logoutUser, token } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const photosData: { title: string; src: string }[] = [];

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleLogOut = () => {
    logoutUser();
  };

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  return (
    <Box className="container mx-auto py-10 flex flex-col md:flex-row gap-8">
      <Paper
        elevation={3}
        className="w-full md:w-1/4 p-4 rounded-xl shadow-md border border-gray-200 mt-10 md:mt-0"
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={selectedTab}
          onChange={handleTabChange}
          TabIndicatorProps={{ className: "bg-blue-900 rounded-full" }}
          className="space-y-2"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={Home} color="#4CAF50" />
                <StyledTabText>Dashboard</StyledTabText>
              </StyledTabLabel>
            }
          />
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={AccountCircle} color="#4CAF50" />
                <StyledTabText>Profile</StyledTabText>
              </StyledTabLabel>
            }
          />
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={Notifications} color="#FF0000" />
                <StyledTabText>Notification</StyledTabText>
              </StyledTabLabel>
            }
          />
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={ShoppingCart} color="#9C27B0" />
                <StyledTabText>Orders</StyledTabText>
              </StyledTabLabel>
            }
          />
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={Settings} color="#2196F3" />
                <StyledTabText>Wishlists</StyledTabText>
              </StyledTabLabel>
            }
          />
          <StyledTab
            label={
              <StyledTabLabel>
                <StyledIcon as={Info} color="#FF9800" />
                <StyledTabText>Feedback</StyledTabText>
              </StyledTabLabel>
            }
          />
        </Tabs>
        <StyledIconButton aria-label="Logout" onClick={handleLogOut}>
          <PowerSettingsNew />
          <span className="ms-2 text-[14px] text-gray-500">Log Out</span>
        </StyledIconButton>
      </Paper>

      <Paper
        elevation={3}
        className="w-full md:w-3/4 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col" // Adjusted for responsive layout
      >
        <div className="flex-grow">
          {selectedTab === 0 && (
            <div>
              <Dashboard />
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <ProfileTab />
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <NotificationTab />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <OrderDetails />
            </div>
          )}
          {selectedTab === 4 && (
            <div>
              <Wishlist />
            </div>
          )}
          {selectedTab === 5 && (
            <div>
              <Feedback photosData={photosData} />
            </div>
          )}
        </div>
      </Paper>
    </Box>
  );
};

export default Account;
