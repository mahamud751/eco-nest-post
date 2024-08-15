import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface StatusButtonProps {
  status: string;
}

const StyledButton = styled(Button)<{ status: string }>(({ status }) => ({
  cursor: status === "active" ? "unset" : "pointer",
  verticalAlign: "middle",
  boxSizing: "border-box",
  backgroundColor:
    status === "active" || status === "processing"
      ? "rgba(185, 246, 202, 0.6)"
      : "rgba(251, 233, 231, 0.8)",
  color:
    status === "active" || status === "processing"
      ? "rgb(20,170,156)"
      : "rgb(216, 67, 21)",
  borderRadius: "5px",
  whiteSpace: "nowrap",
  textTransform: "none",
  padding: "1px 8px",
  fontSize: "0.875rem",
  "&:hover": {
    backgroundColor:
      status === "active" || status === "processing"
        ? "rgba(185, 246, 202, 0.6)"
        : "#e57373",
    color:
      status === "active" || status === "processing"
        ? "rgb(0, 200, 83)"
        : "#ffffff",
    cursor: "unset",
    filter: "none",
  },
  "&:focus": {
    outline: "none",
  },
}));

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  return (
    <StyledButton status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </StyledButton>
  );
};

export default StatusButton;
