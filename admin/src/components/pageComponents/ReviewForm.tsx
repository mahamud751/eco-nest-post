import React from "react";
import { Review } from "@/services/types";
import { Grid } from "@mui/material";

interface ReviewFormProps {
  review: Review | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ }) => {
  return <Grid item xs={12} md={8}></Grid>;
};

export default ReviewForm;
