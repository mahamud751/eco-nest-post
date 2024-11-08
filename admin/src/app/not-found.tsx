"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { NotFoundAnimation } from "@/services/utils/dynamicAnimations";

const NotFound: React.FC = () => {
  return (
    <Box className="flex flex-col justify-center items-center pb-10">
      <NotFoundAnimation />
      <Typography variant="h4" className="text-center text-gray-700">
        Oops! Page not found.
      </Typography>
      <Link href="/">
        <Button
          variant="contained"
          className="mt-5 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 transition-all duration-300"
        >
          Return Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
