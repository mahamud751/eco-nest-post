"use client";
import React, { useState, useEffect } from "react";
import UseFetch from "@/services/hooks/UseRequest";
import {
  Grid,
  Autocomplete,
  TextField,
  Button,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { User, Permission } from "@/services/types";
import Swal from "sweetalert2";

const PermissionList: React.FC = () => {
  const { data: userData } = UseFetch<{ data: User[] }>("users");
  const { data: permissionData } = UseFetch<{ data: Permission[] }>(
    "permissions"
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const users = userData?.data || [];
  const permissions = permissionData?.data || [];

  // Effect to set initial permissions for the selected user
  useEffect(() => {
    if (selectedUser) {
      setSelectedPermissions(selectedUser.permissions?.map((p) => p.id) || []);
    } else {
      setSelectedPermissions([]);
    }
  }, [selectedUser]);

  const handleUserChange = (user: User | null) => {
    setSelectedUser(user);
  };

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId); // Unselect permission
      }
      return [...prev, permissionId]; // Select permission
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) return;

    const payload = {
      email: selectedUser.email,
      permissions: selectedPermissions,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update permissions");
      }

      // Optionally, refetch user data here to get the latest permissions
      // If the response contains updated user data, update the state accordingly
      const updatedUser = await response.json();
      setSelectedPermissions(updatedUser.permissions.map((p: any) => p.id));

      Swal.fire({
        title: "Success",
        text: "Permissions updated successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.error("Error updating permissions:", error);

      Swal.fire({
        title: "Error",
        text: "Failed to update permissions. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={users}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => handleUserChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select User"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              {selectedUser && (
                <Grid item xs={12}>
                  <Typography variant="h6">Permissions</Typography>
                  {permissions.map((permission) => (
                    <FormControlLabel
                      key={permission.id}
                      control={
                        <Checkbox
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                        />
                      }
                      label={permission.name}
                    />
                  ))}
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              className="mt-12 text-white bg-neutral-950 px-6 py-3 hover:bg-neutral-700"
              sx={{
                background: "#1C252E",
                "&:hover": { backgroundColor: "#1C252E" },
              }}
            >
              Assign Permissions
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default PermissionList;
