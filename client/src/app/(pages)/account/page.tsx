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
import { styled } from "@mui/material/styles";
import OrderDetails from "@/components/pageComponents/account/Orders";
import Wishlist from "@/components/pageComponents/account/Wishlist";
import { useAuth } from "@/services/hooks/auth";

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

const VerticalTabsWithIcons: React.FC = () => {
  const { logoutUser } = useAuth();
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
          <ExitToApp />
          <span className="ms-2 text-[14px] text-gray-500">Log Out</span>
        </StyledIconButton>
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
