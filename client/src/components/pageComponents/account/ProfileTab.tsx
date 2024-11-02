"use client";

import React, { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { Box } from "@mui/material";
import { useAuth } from "@/services/hooks/auth";
import { User } from "@/services/types/types";
import axios from "axios";

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<User | null>(null);
  const fetchData = async () => {
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${user?.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const { openSnackbar } = useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${user?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      openSnackbar("Update successfully!", "success", "#4caf50");
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
            <h2 className="font-bold mb-2">My Profile Details</h2>
            <TextField
              label="Enter your name"
              name="name"
              fullWidth
              margin="normal"
              required
              defaultValue={data?.name}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Enter your email"
              name="email"
              fullWidth
              margin="normal"
              required
              defaultValue={data?.email}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className="flex-1 p-2">
          <TextField
            label="Enter your phone number"
            name="phone"
            fullWidth
            margin="normal"
            required
            defaultValue={data?.phone}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter your address"
            name="address"
            fullWidth
            margin="normal"
            required
            defaultValue={data?.address}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ProfileTab;
