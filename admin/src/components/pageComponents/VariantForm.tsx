"use client";
import React, { useState, ChangeEvent } from "react";
import { Grid, TextField, IconButton, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface VariantFormProps {
  variant: { name: string; options: string[] } | null;
}

const VariantForm: React.FC<VariantFormProps> = ({ variant }) => {
  const [options, setOptions] = useState<string[]>(variant?.options || [""]);

  const handleOptionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="variant-name"
          label="Variant Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={variant?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {options.map((option, index) => (
        <Grid item xs={12} key={index}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label={`Option ${index + 1}`}
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                name={`options[${index}]`}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="error"
                onClick={() => handleRemoveOption(index)}
                disabled={options.length === 1}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </Grid>
    </Grid>
  );
};

export default VariantForm;
