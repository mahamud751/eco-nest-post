"use client";

import React, { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { Box } from "@mui/material";

const Vendor: React.FC = () => {
  const { openSnackbar } = useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderData = {
      name: formData.get("name"),
      email: formData.get("email"),
      number: formData.get("number"),
      address: formData.get("address"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/vendors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      openSnackbar("Vendor Addes successfully!", "success", "#4caf50");
    } catch (error) {
      console.error("Error placing order:", error);
      openSnackbar("Failed to place order!", "error", "#f44336");
    }
  };

  return (
    <Box className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-2">
            <h2 className="font-bold mb-2">Vendor Details</h2>
            <TextField
              label="Enter your name"
              name="name"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Enter your email"
              name="email"
              fullWidth
              margin="normal"
              required
            />
          </div>
        </div>
        <div className="flex-1 p-2">
          <TextField
            label="Enter your phone number"
            name="number"
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Enter your address"
            name="address"
            fullWidth
            margin="normal"
            required
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Vendor;
