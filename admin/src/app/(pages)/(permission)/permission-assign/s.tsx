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

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const users = userData?.data || [];
  const permissions = permissionData?.data || [];
  const roles = Array.from(new Set(users.map((user) => user.role)));

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

    const payloads = usersToUpdate.map((user) => ({
      id: user.id,
      email: user.email,
      permissions: selectedPermissions,
    }));

    try {
      await Promise.all(
        payloads.map((payload) =>
          fetch(`${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${payload.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: payload.email,
              permissions: payload.permissions,
            }),
          })
        )
      );

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
