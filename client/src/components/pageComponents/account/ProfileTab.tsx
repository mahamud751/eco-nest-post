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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { openSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user?.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderData = {
      name: formData.get("name"),
      email: user?.email,
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user?.id}`,
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
      openSnackbar("Profile updated successfully!", "success", "#4caf50");
    } catch (error) {
      console.error("Error updating profile:", error);
      openSnackbar("Failed to update profile!", "error", "#f44336");
    }
  };

  const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      openSnackbar("Passwords do not match!", "error", "#f44336");
      return;
    }

    const passwordData = {
      userId: user?.id,
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      openSnackbar("Password updated successfully!", "success", "#4caf50");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      openSnackbar("Failed to update password!", "error", "#f44336");
    }
  };

  return (
    <Box className="container mx-auto py-10">
      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4 p-4">
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
              disabled
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

      <form
        onSubmit={handlePasswordUpdate}
        className="flex flex-col gap-4 p-4 mt-8"
      >
        <h2 className="font-bold mb-2">Change Password</h2>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Update Password
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ProfileTab;
