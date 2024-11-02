import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { User } from "@/services/types";

interface CustomerRoleUpdateModalProps {
  data: User;
  onClose: () => void;
}

const CustomerRoleUpdate: React.FC<CustomerRoleUpdateModalProps> = ({
  data,
  onClose,
}) => {
  const MySwal = withReactContent(Swal);
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    if (data) {
      setRole(data.role);
    }
  }, [data]);

  const handleRoleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/${data.id}/update-role`,
        { role, email: data.email }
      );

      if (response.status === 200) {
        onClose();
        MySwal.fire({
          icon: "success",
          title: "Role Updated",
          text: `The role for ${data.email} has been updated to ${role}`,
        });
        window.location.reload();
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update role.",
      });
      console.error("Error updating role:", error);
    }
  };

  return (
    <Modal open={!!data} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg mx-auto mt-20 w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Role Update</h2>

        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role-select"
            label="Select Role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="superAdmin">Super Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="vendor">Vendor</MenuItem>
            <MenuItem value="rider">Rider</MenuItem>
            <MenuItem value="schoolManager">School Manager</MenuItem>
            <MenuItem value="b2bManager">B2B User</MenuItem>
          </Select>
        </FormControl>

        <div className="mt-6 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleRoleUpdate}
          >
            Update Role
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerRoleUpdate;
