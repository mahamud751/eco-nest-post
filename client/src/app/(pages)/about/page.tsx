"use client";
import React from "react";
import { Container, Typography, Box, Grid2 as Grid } from "@mui/material";
import { motion } from "framer-motion";
import Faq from "@/components/pageComponents/about/Faq";
import LottieAnimation from "@/components/dynamics/animations/LottieAnimation";

const About: React.FC = () => {
  return (
    <Box className="mt-20">
      <Container maxWidth="lg">
        <Box className="main-txt text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Typography
              variant="h2"
              className="text-[#0F4C75] font-bold leading-tight"
            >
              Welcome To KORBO JOY
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Typography variant="body1" className="my-5 text-gray-700 text-lg">
              KORBO JOY is a private company with a social purpose. We came up
              with a solution for one of the biggest problems in the education
              sector (especially primary, secondary, and post-secondary
              education), which is the dropout of students due to lack of
              educational ...
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4} className="why-choose mt-20">
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            className="flex justify-center items-center"
          >
            <LottieAnimation />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                className="text-center font-semibold mb-10"
              >
                Why Choose Us?
              </Typography>
              <Faq />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
