"use client";
import React, { useState, useEffect } from "react";
import UseFetch from "@/services/hooks/UseRequest";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Typography,
} from "@mui/material";
import { User, Permission } from "@/services/types";

const PermissionList: React.FC = () => {
  const { data: userData } = UseFetch<{ data: User[] }>("users");
  const { data: permissionData } = UseFetch<{ data: Permission[] }>(
    "permissions"
  );

  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string[];
  }>({});

  const users = userData?.data || [];
  const permissions = permissionData?.data || [];

  useEffect(() => {
    const initialPermissions: { [key: string]: string[] } = {};
    users.forEach((user) => {
      // If user.permissions is an array of strings, no need to map over an object with 'id'
      initialPermissions[user.id] = user.permissions || [];
    });
    setSelectedPermissions(initialPermissions);
  }, [users]);

  const handlePermissionChange = (userId: string, permissionId: string) => {
    setSelectedPermissions((prev) => {
      const userPermissions = prev[userId] || [];
      if (userPermissions.includes(permissionId)) {
        return {
          ...prev,
          [userId]: userPermissions.filter((id) => id !== permissionId),
        };
      } else {
        return { ...prev, [userId]: [...userPermissions, permissionId] };
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await Promise.all(
        users.map(async (user) => {
          const payload = {
            userId: user.id,
            permissions: selectedPermissions[user.id] || [],
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${user.id}`,
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
        })
      );

      console.log("Permissions updated successfully!");
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} key={user.id}>
            <Typography variant="h6">{user.name}</Typography>
            <FormGroup>
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={
                        selectedPermissions[user.id]?.includes(permission.id) ||
                        false
                      }
                      onChange={() =>
                        handlePermissionChange(user.id, permission.id)
                      }
                    />
                  }
                  label={permission.name}
                />
              ))}
            </FormGroup>
          </Grid>
        ))}
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Update Permissions
      </Button>
    </form>
  );
};

export default PermissionList;
