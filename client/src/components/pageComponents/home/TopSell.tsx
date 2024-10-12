"use client";
import React from "react";
import { Container, Box, Grid2 as Grid } from "@mui/material";
import VerticalProductSlider from "./VerticalPordoucSlider";

const TopSell: React.FC = () => {
  return (
    <Box className="mt-20">
      <Container maxWidth="lg">
        <Grid container spacing={4} className="why-choose mt-20">
          <Grid size={{ xs: 12, md: 6 }}>
            <VerticalProductSlider />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <VerticalProductSlider />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TopSell;
