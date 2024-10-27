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
  CircularProgress,
} from "@mui/material";
import { User, Permission } from "@/services/types";
import Swal from "sweetalert2";

const PermissionList: React.FC = () => {
  const { data: userData } = UseFetch<{ data: User[] }>("users");

  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loadingPermissions, setLoadingPermissions] = useState<boolean>(true);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const users = userData?.data || [];
  const roles = Array.from(new Set(users.map((user) => user.role)));

  const fetchAllPermissions = async () => {
    try {
      let allPermissions: Permission[] = [];
      let currentPage = 1;
      let hasMore = true;

      // Fetch permissions page by page
      while (hasMore) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/permissions?page=${currentPage}`
        );
        const result = await response.json();
        console.log(result);

        // Append current page permissions to the total
        allPermissions = [...allPermissions, ...result.data];

        // If the result's length is less than 10, stop fetching
        hasMore = result.data.length === 10;
        currentPage++;
      }

      setPermissions(allPermissions);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    } finally {
      setLoadingPermissions(false);
    }
  };

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
    setSelectedUser(null);
  };

  const handleUserChange = (user: User | null) => {
    setSelectedUser(user);
    setSelectedRole(null);
  };

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usersToUpdate = selectedRole
      ? users.filter((user) => user.role === selectedRole)
      : selectedUser
      ? [selectedUser]
      : [];

    let url = "";
    let payload = {};

    if (selectedRole) {
      url = `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/batch-update`;
      payload = {
        ids: usersToUpdate.map((user) => user.id),
        updateUserDto: {
          permissions: selectedPermissions,
        },
      };
    } else if (selectedUser) {
      url = `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${selectedUser.id}`;
      payload = {
        email: selectedUser.email,
        permissions: selectedPermissions,
      };
    }

    try {
      if (url) {
        await fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        Swal.fire({
          title: "Success",
          text: `Permissions updated successfully${
            selectedRole ? " for role!" : " for user!"
          }`,
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Error updating permissions:", error);

      Swal.fire({
        title: "Error",
        text: `Failed to update permissions${
          selectedRole ? " for role." : " for user."
        } Please try again.`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  useEffect(() => {
    if (selectedUser) {
      const userPermissions = selectedUser.permissions?.map((p) => p.id) || [];
      if (
        JSON.stringify(selectedPermissions) !== JSON.stringify(userPermissions)
      ) {
        setSelectedPermissions(userPermissions);
      }
    } else if (selectedRole) {
      const roleUsers = users.filter((user) => user.role === selectedRole);
      const rolePermissions = new Set<string>();
      roleUsers.forEach((user) =>
        user.permissions?.forEach((perm) => rolePermissions.add(perm.id))
      );
      const rolePermissionsArray = Array.from(rolePermissions);
      if (
        JSON.stringify(selectedPermissions) !==
        JSON.stringify(rolePermissionsArray)
      ) {
        setSelectedPermissions(rolePermissionsArray);
      }
    } else {
      if (selectedPermissions.length > 0) {
        setSelectedPermissions([]);
      }
    }
  }, [selectedUser, selectedRole, users]);

  return (
    <div className="md:mx-24 md:p-12">
      <Paper elevation={2} className="shadow-lg">
        <Box sx={{ padding: { xs: 1, sm: 8 } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={roles}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => handleRoleChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Role"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

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

              <Grid item xs={12}>
                <Typography variant="h6">Permissions</Typography>
                {loadingPermissions ? (
                  <CircularProgress />
                ) : (
                  permissions.map((permission) => (
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
                  ))
                )}
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
              Assign Permissions
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default PermissionList;
