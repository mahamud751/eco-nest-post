import React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";

interface StatusButtonProps {
  status: string;
}

const StyledButton = styled(Button)<{ status: string }>(({ theme, status }) => {
  const isDarkMode = theme.palette.mode === "dark";

  let backgroundColor;
  let color;

  switch (status) {
    case "active":
    case "delivered":
    case "approve":
      backgroundColor = isDarkMode
        ? "rgb(20,170,156)"
        : "rgba(185, 246, 202, 0.6)";
      color = isDarkMode ? "#fcfffe" : "rgb(20,170,156)";
      break;
    case "processing":
      backgroundColor = isDarkMode ? "#0288d1" : "#006C9C";
      color = "#FFFFFF";
      break;
    case "pending":
      backgroundColor = isDarkMode ? "#ffb300" : "#FFAB00";
      color = "#FFFFFF";
      break;
    case "inactive":
    case "reject":
    case "deactive":
    case "canceled":
    case "blocked":
      backgroundColor = isDarkMode ? "#f44336" : "rgba(251, 233, 231, 0.8)";
      color = isDarkMode ? "#ffffff" : "rgb(216, 67, 21)";
      break;
    default:
      backgroundColor = isDarkMode ? "#f44336" : "rgba(251, 233, 231, 0.8)";
      color = isDarkMode ? "#ffffff" : "rgb(216, 67, 21)";
      break;
  }

  return {
    cursor: status === "active" || status === "approve" ? "unset" : "pointer",
    verticalAlign: "middle",
    boxSizing: "border-box",
    backgroundColor,
    color,
    borderRadius: "5px",
    whiteSpace: "nowrap",
    textTransform: "none",
    padding: "1px 8px",
    fontSize: "0.875rem",
    "&:hover": {
      backgroundColor:
        status === "active" || status === "approve" || status === "processing"
          ? backgroundColor
          : "#e57373",
      color:
        status === "active" || status === "approve" || status === "processing"
          ? color
          : "#ffffff",
      cursor: "unset",
      filter: "none",
    },
    "&:focus": {
      outline: "none",
    },
  };
});

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  const theme = useTheme();

  return (
    <StyledButton theme={theme} status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </StyledButton>
  );
};

export default StatusButton;
