// ProductTabs.tsx
"use client";
import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { Product } from "@/services/types";
import Image from "next/image";

interface AdditionalTabProps {
  product: Product;
}

const AdditionalTab = ({ product }: AdditionalTabProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <div className="flex justify-between items-center">
            <Image
              src={product?.photos[0]?.src || ""}
              alt="Selected Image"
              width={500}
              height={500}
              className="object-cover"
            />

            <div className="ms-12">
              <Typography variant="body1">{product?.fulldesc}</Typography>
            </div>
          </div>
        );
      case 1:
        return (
          <Typography variant="body1">
            Category: {product?.category?.name}
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
