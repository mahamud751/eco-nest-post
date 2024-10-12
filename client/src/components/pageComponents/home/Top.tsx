"use client";
import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import Image from "next/image";
import LatestProduct from "./LatestProduct";
import PopularProduct from "./PopularProduct";

const Top: React.FC = () => {
  return (
    <Box className="mt-20 container  mx-auto py-10">
      <div className="bg-[#f3f4f6] p-12 shadow-lg rounded-lg mb-10">
        <Grid container spacing={4} className="why-choose mt-20">
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mt: 13 }}>
              <Image
                src={
                  "https://i.ibb.co.com/wgXsmmM/White-Green-Creative-Skincare-Instagram-Story.png"
                }
                alt={"summer offer"}
                objectFit="cover"
                width={1000}
                height={200}
                style={{
                  width: "100%",
                  height: 700,
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <LatestProduct />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularProduct />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Top;
