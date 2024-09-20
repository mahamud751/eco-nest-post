"use client";
import AnimatedImage from "@/components/atoms/AnimatedImage";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
        >
          <AnimatedImage />
        </Box>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
}
