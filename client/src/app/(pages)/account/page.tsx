"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Home, Settings, Info, ShoppingCart } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tab: {
    minWidth: 100,
    textTransform: "none",
    "&.Mui-selected": {
      color: "#1E3A8A", // Tailwind 'blue-900'
    },
  },
  icon: {
    marginBottom: 4,
  },
}));

const VerticalTabsWithIcons: React.FC = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="flex h-full">
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Vertical tabs"
        className="w-48 border-r border-gray-300"
        TabIndicatorProps={{ className: "bg-blue-900" }} // Tailwind 'blue-900'
      >
        <Tab
          label="Home"
          icon={<Home className={classes.icon} />}
          className={`${classes.tab} flex flex-col items-center text-gray-600 hover:text-blue-900`}
        />
        <Tab
          label="Shop"
          icon={<ShoppingCart className={classes.icon} />}
          className={`${classes.tab} flex flex-col items-center text-gray-600 hover:text-blue-900`}
        />
        <Tab
          label="Settings"
          icon={<Settings className={classes.icon} />}
          className={`${classes.tab} flex flex-col items-center text-gray-600 hover:text-blue-900`}
        />
        <Tab
          label="Info"
          icon={<Info className={classes.icon} />}
          className={`${classes.tab} flex flex-col items-center text-gray-600 hover:text-blue-900`}
        />
      </Tabs>

      {/* Tab Content */}
      <Box className="flex-grow p-4">
        {selectedTab === 0 && <div>Home Content</div>}
        {selectedTab === 1 && <div>Shop Content</div>}
        {selectedTab === 2 && <div>Settings Content</div>}
        {selectedTab === 3 && <div>Info Content</div>}
      </Box>
    </div>
  );
};

export default VerticalTabsWithIcons;
