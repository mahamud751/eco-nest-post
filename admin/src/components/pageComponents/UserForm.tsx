import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useBangladeshPhoneValidation } from "@/services/hooks/common";
import { UserFormProps } from "@/services/types";

const UserForm: React.FC<UserFormProps> = ({ user, role, setRole }) => {
  const [phone, setPhone] = useState<string>("");
  const { error, validatePhoneNumber } = useBangladeshPhoneValidation();

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    validatePhoneNumber(event.target.value);
  };
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="User Name"
          name="name"
          fullWidth
          defaultValue={user?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={user?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          fullWidth
          defaultValue={user?.phone || ""}
          onChange={handlePhoneChange}
          error={!!error}
          helperText={error}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          fullWidth
          defaultValue={user?.address || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {!user?.id && (
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            fullWidth
            defaultValue={user?.password || ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      )}

      <Grid item xs={12} md={4}>
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
            <MenuItem value="schoolManager">School Manager</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default UserForm;
