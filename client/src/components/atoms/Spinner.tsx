// Spinner.tsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        animation: "fadeIn 0.5s",
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: "primary.main",
          animation: "spin 1s linear infinite",
        }}
      />
    </Box>
  );
};

export default Spinner;
