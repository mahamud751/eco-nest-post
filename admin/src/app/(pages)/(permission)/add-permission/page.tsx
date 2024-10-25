"use client";
import React, { useState } from "react";
import UseFetch from "@/services/hooks/UseRequest";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
  Paper,
  Box,
} from "@mui/material";
import { User } from "@/services/types";

const AddPermission: React.FC = () => {
  const { data: responseData } = UseFetch<{ data: User[] }>("users");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [permissionName, setPermissionName] = useState("");

  const users = responseData?.data || [];

  const handleUsersChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedUsers(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: permissionName,
      users: selectedUsers,
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

      console.log("Permission added successfully!");
      setPermissionName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error adding permission:", error);
    }
  };

  return (
    <div className="md:mx-24 md:p-12">
      <Paper elevation={2} className="shadow-lg">
        <Box
          sx={{
            padding: {
              xs: 1,
              sm: 8,
            },
          }}
        >
          {" "}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Permission Name"
                  name="name"
                  fullWidth
                  value={permissionName}
                  onChange={(e) => setPermissionName(e.target.value)}
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

            <Button
              type="submit"
              className="mt-12 text-white bg-neutral-950 px-6 py-3 hover:bg-neutral-700"
              sx={{
                background: "#1C252E",
                "&:hover": { backgroundColor: "#1C252E" },
              }}
            >
              Add Permission
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default AddPermission;
