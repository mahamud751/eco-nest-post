import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Permission, User } from "@/services/types";

interface PermissionFormProps {
  permission: Permission | null;
  users: User[];
  selectedUsers: string[];
  onUsersChange: (selectedUsers: string[]) => void;
}

const PermissionForm: React.FC<PermissionFormProps> = ({
  permission,
  users,
  selectedUsers,
  onUsersChange,
}) => {
  const handleUserChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // Ensure value is handled as an array (no need for .split anymore)
    onUsersChange(value as string[]);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Permission Name"
            name="name"
            fullWidth
            defaultValue={permission?.name || ""}
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
              onChange={handleUserChange}
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
    </>
  );
};

export default PermissionForm;
