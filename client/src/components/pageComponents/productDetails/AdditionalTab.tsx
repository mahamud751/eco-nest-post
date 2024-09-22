// ProductTabs.tsx
"use client";
import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const AdditionalTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <Typography variant="body1">
            This is the product description. It provides details about the
            product, its features, specifications, and other relevant
            information.
          </Typography>
        );
      case 1:
        return (
          <Typography variant="body1">
            Additional information about the product, including dimensions,
            materials used, and other technical details.
          </Typography>
        );
      case 2:
        return (
          <Typography variant="body1">
            User reviews and ratings for the product will be displayed here.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="product tabs">
        <Tab label="Description" />
        <Tab label="Additional Info" />
        <Tab label="Reviews" />
      </Tabs>
      <Box mt={2}>{renderContent()}</Box>
    </Box>
  );
};

export default AdditionalTab;
