"use client";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Flashsale from "./Flashsale";

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

const HomeFavouriteTab = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box className="container mx-auto py-10">
      <Tabs
        value={tabValue}
        onChange={handleChange}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          alignItems: "flex-start",
          marginLeft: 2,
        }}
      >
        <Tab
          label="Flashsale"
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
        <Tab
          label="Latest"
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
        <Tab
          label="Popular"
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
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Flashsale />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <h2>Latest Products: Hello!</h2>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <h2>Popular Products: Hello!</h2>
      </TabPanel>
    </Box>
  );
};

export default HomeFavouriteTab;
