"use client";

import React, { useState, ChangeEvent } from "react";
import { Grid, TextField, IconButton, Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { VariantFormProps } from "@/services/types";

const VariantForm: React.FC<VariantFormProps> = ({
  variant,
  variantOptions,
  setVariantOptions,
}) => {
  const handleChangeInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const list = [...variantOptions];
    list[index] = value;
    setVariantOptions(list);
  };

  const handleAddInput = () => {
    setVariantOptions([...variantOptions, ""]);
  };

  const handleRemoveInput = (index: number) => {
    const list = [...variantOptions];
    list.splice(index, 1);
    setVariantOptions(list);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TextField
          id="outlined-basic"
          label="Variant Name"
          variant="outlined"
          name="name"
          defaultValue={variant?.name || ""}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        {variantOptions.map((size, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            className="my-2 p-2 border border-gray-300 rounded-md"
          >
            <TextField
              variant="outlined"
              name="options"
              value={size}
              onChange={(e) => handleChangeInput(index, e)}
              label="Options"
              fullWidth
              className="mr-2"
            />
            {variantOptions.length > 1 && (
              <IconButton
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleRemoveInput(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            className="mt-2 bg-blue-500 hover:bg-blue-700"
            startIcon={<AddCircleIcon />}
            onClick={handleAddInput}
          >
            Add options
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VariantForm;
