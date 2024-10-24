"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm"; // Not used in this snippet, consider removing if not needed
import UseFetch from "@/services/hooks/UseRequest";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { User } from "@/services/types";

const AddPermission: React.FC = () => {
  // Fetch users from API
  const { data: responseData } = UseFetch<{ data: User[] }>("users");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [permissionName, setPermissionName] = useState("");

  const users = responseData?.data || [];

  // Handle the change in selected users
  const handleUsersChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(typeof value === "string" ? value.split(",") : value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Create an array of selected user objects
    const selectedUserDetails = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    const payload = {
      name: permissionName,
      users: selectedUserDetails, // Send the full user objects
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/permissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success (e.g., redirect, show a success message)
      console.log("Permission added successfully!");
      // Optionally, reset form
      setPermissionName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error adding permission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Permission Name"
            name="name"
            fullWidth
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)} // Update state on change
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">Select Users</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              multiple
              value={selectedUsers}
              name="users"
              onChange={handleUsersChange}
              renderValue={(selected) =>
                selected
                  .map((userId) => {
                    const user = users.find((u) => u.id === userId);
                    return user ? user.name : "";
                  })
                  .join(", ")
              }
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Add Permission
      </Button>
    </form>
  );
};

export default AddPermission;
