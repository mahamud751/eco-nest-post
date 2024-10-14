import React from "react";
import { Review } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface ReviewFormProps {
  review: Review | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  return (
    <Grid item xs={12} md={8}>
      <TextField
        id="review-name"
        label="User Name"
        variant="outlined"
        name="userName"
        fullWidth
        defaultValue={review?.userName || ""}
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
  );
};

export default ReviewForm;
