import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Faq from "@/components/pageComponents/about/Faq";

const About: React.FC = () => {
  return (
    <Box className="about pt-20 pb-16 bg-gray-100">
      <Container maxWidth="lg">
        <Box className="main-txt text-center mb-16">
          <Typography
            variant="h2"
            className="text-[#0F4C75] font-bold leading-tight"
          >
            Welcome To KORBO JOY
          </Typography>
          <Typography variant="body1" className="my-5 text-gray-700 text-lg">
            KORBO JOY is a private company with a social purpose. We came up
            with a solution for one of the biggest problems in the education
            sector (especially primary, secondary, and post-secondary
            education), which is the dropout of students due to lack of
            educational equipment ...
          </Typography>
        </Box>

        <Box className="why-choose mt-20">
          <Typography
            variant="h4"
            className="text-center text-[#1B262C] font-semibold mb-10"
          >
            Why Choose Us?
          </Typography>
          <Faq />
        </Box>
      </Container>
    </Box>
  );
};

export default About;
