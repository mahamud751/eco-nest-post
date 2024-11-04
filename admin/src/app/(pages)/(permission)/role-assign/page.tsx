"use client";

import React, { useState, useEffect, useCallback } from "react";
import UseFetch from "@/services/hooks/UseRequest";
import {
  Grid,
  Button,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Modal,
  IconButton,
} from "@mui/material";
import { User, Permission } from "@/services/types";
import Swal from "sweetalert2";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import SuperAdminAnimation from "@/components/dynamics/animations/SuperAdminAnimation";
import EducAnimation from "@/components/dynamics/animations/EducAnimation";
import VendorAnimation from "@/components/dynamics/animations/VendorAnimation";
import RiderAnimation from "@/components/dynamics/animations/RiderAnimation";
import B2BMangerAnimation from "@/components/dynamics/animations/B2BMangerAnimation";
import UserAnimation from "@/components/dynamics/animations/UserAnimation";
import ManagerAnimation from "@/components/dynamics/animations/ManagerAnimation";
import AdminAnimation from "@/components/dynamics/animations/AdminAnimation";

const roleStyles = {
  user: {
    gradient: "linear-gradient(to right, #040404, #165fb8)",
    animation: <UserAnimation />,
  },
  rider: {
    gradient: "linear-gradient(to right, #040404, #FF1744)",
    animation: <RiderAnimation />,
  },
  schoolManager: {
    gradient: "linear-gradient(to right, #4CAF50, #A5D6A7)",
    animation: <EducAnimation />,
  },
  vendor: {
    gradient: "linear-gradient(to right, #2196F3, #90CAF9)",
    animation: <VendorAnimation />,
  },
  superAdmin: {
    gradient: "linear-gradient(to right, #FF5722, #FFB74D)",
    animation: <SuperAdminAnimation />,
  },
  b2bManager: {
    gradient: "linear-gradient(to right, #040404, #a83bc8)",
    animation: <B2BMangerAnimation />,
  },
  manager: {
    gradient: "linear-gradient(to right, #040404, #a83bc8)",
    animation: <ManagerAnimation />,
  },
  admin: {
    gradient: "linear-gradient(to right, #040404, #a83bc8)",
    animation: <AdminAnimation />,
  },

  default: {
    gradient: "linear-gradient(to right, #CCCCCC, #FFFFFF)",
    animation: null,
  },
};

const RolePermissionList: React.FC = () => {
  const { data: userData, reFetch: reFetchUserData } = UseFetch<{
    data: User[];
  }>("users");
  const { data: permissionData } = UseFetch<{
    data: Permission[];
  }>("permissions");

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const users = userData?.data || [];
  const permissions = permissionData?.data || [];
  const roles = Array.from(new Set(users.map((user) => user.role)));

  const getUserCountForRole = (role: string) =>
    users.filter((user) => user.role === role).length;

  const handleRoleChange = useCallback((role: string | null) => {
    setSelectedRole(role);
    setSelectedUser(null);
    setModalOpen(true);
  }, []);

  const handlePermissionChange = useCallback((permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    const allPermissionIds = permissions.map((perm) => perm.id);
    setSelectedPermissions(selectAll ? [] : allPermissionIds);
    setSelectAll(!selectAll);
  }, [permissions, selectAll]);

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
        updateUserDto: { permissions: selectedPermissions },
      };
    } else if (selectedUser) {
      url = `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${selectedUser.id}`;
      payload = { email: selectedUser.email, permissions: selectedPermissions };
    }

    try {
      if (url) {
        await fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (selectedUser) {
          const updatedUser = {
            ...selectedUser,
            permissions: selectedPermissions.map((permId) =>
              permissions.find((perm) => perm.id === permId)
            ),
          };
          localStorage.setItem(
            `user_${updatedUser.id}`,
            JSON.stringify(updatedUser)
          );
        } else if (selectedRole) {
          usersToUpdate.forEach((user) => {
            const updatedUser = {
              ...user,
              permissions: selectedPermissions.map((permId) =>
                permissions.find((perm) => perm.id === permId)
              ),
            };
            localStorage.setItem(
              `user_${updatedUser.id}`,
              JSON.stringify(updatedUser)
            );
          });
        }

        setModalOpen(false);
        Swal.fire({
          title: "Success",
          text: `Permissions updated successfully${
            selectedRole ? " for role!" : " for user!"
          }`,
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          reFetchUserData();
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
      setSelectedPermissions(userPermissions);
    } else if (selectedRole) {
      const roleUsers = users.filter((user) => user.role === selectedRole);
      const rolePermissions = new Set<string>();
      roleUsers.forEach((user) =>
        user.permissions?.forEach((perm) => rolePermissions.add(perm.id))
      );
      setSelectedPermissions(Array.from(rolePermissions));
    } else {
      setSelectedPermissions([]);
    }
  }, [selectedUser, selectedRole, users]);
  const getRoleStyle = (role: string) => {
    return (
      roleStyles[role as keyof typeof roleStyles] || {
        animation: null,
        color: "#ffffff",
      }
    );
  };
  return (
    <div className="md:mx-24 md:p-12">
      <Grid container spacing={3}>
        {roles.map((role, index) => {
          const { gradient, animation } = getRoleStyle(role);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleRoleChange(role)}
                sx={{
                  cursor: "pointer",
                  background: gradient,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "15px",
                  padding: "20px",
                  color: "#fff",
                }}
              >
                <CardContent>
                  <div className="justify-center">
                    <Typography variant="h6" className="uppercase ">
                      {role} ({getUserCountForRole(role)}Users)
                    </Typography>
                    <IconButton className="justify-center">
                      <AdminPanelSettingsIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </div>
                  {animation}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500, md: 800 },
            maxWidth: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: 24,
            outline: 0,
          }}
        >
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              Permissions for {selectedRole}
            </Typography>

            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => setModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                }
                label="Select All"
              />
            </Box>

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

            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                fullWidth
                className="mt-12 text-white bg-neutral-950 px-6 py-3 hover:bg-neutral-700"
                sx={{
                  background: "#1C252E",
                  "&:hover": { backgroundColor: "#1C252E" },
                }}
              >
                Assign Permissions ({getUserCountForRole(selectedRole || "")}{" "}
                Users)
              </Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default RolePermissionList;
