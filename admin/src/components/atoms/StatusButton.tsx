import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface StatusButtonProps {
  status: string;
}

const StyledButton = styled(Button)<{ status: string }>(({ status }) => {
  let backgroundColor;
  let color;

  switch (status) {
    case "active":
    case "approve":
      backgroundColor = "rgba(185, 246, 202, 0.6)";
      color = "rgb(20,170,156)";
      break;
    case "processing":
      backgroundColor = "#006C9C";
      color = "#FFFFFF";
      break;
    case "pending":
      backgroundColor = "#FFAB00";
      color = "#FFFFFF";
      break;
    case "inactive":
    case "reject":
    case "deactive":
    case "blocked":
      backgroundColor = "rgba(251, 233, 231, 0.8)";
      color = "rgb(216, 67, 21)";
      break;
    default:
      backgroundColor = "rgba(251, 233, 231, 0.8)";
      color = "rgb(216, 67, 21)";
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
  return (
    <StyledButton status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </StyledButton>
  );
};

export default StatusButton;
