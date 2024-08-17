import React from "react";
import { Banner } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  banner: Banner | null;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner }) => {
  return (
    <Grid item xs={12} md={8}>
      <TextField
        id="banner-name"
        label="Banner Name"
        variant="outlined"
        name="name"
        fullWidth
        defaultValue={banner?.name || ""}
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
  );
};

export default BannerForm;
