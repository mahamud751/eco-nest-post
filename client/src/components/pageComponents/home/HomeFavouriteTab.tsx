"use client";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import HomeFavouriteTabContent from "./HomeFavouriteTabContent";

const HomeFavouriteTab = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabData = [
    { label: "Latest", apiEndpoint: "products/latest" },
    { label: "Popular", apiEndpoint: "products/popular" },
  ];

  return (
    <Box className="container mx-auto py-10">
      <div className="bg-[#f3f4f6] p-12 shadow-lg rounded-lg mb-10">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{ alignItems: "flex-start", marginLeft: 2 }}
        >
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                backgroundColor: "#eeeeee",
                marginRight: "10px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#cce7d0",
                },
                "&.Mui-selected": {
                  backgroundColor: "#cce7d0",
                  color: "#088178",
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </Tabs>

        {tabData.map((tab, index) => (
          <TabPanel value={tabValue} index={index} key={index}>
            <HomeFavouriteTabContent
              title={`${tab.label} Products`}
              apiEndpoint={tab.apiEndpoint}
            />
          </TabPanel>
        ))}
      </div>
    </Box>
  );
};

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default HomeFavouriteTab;
