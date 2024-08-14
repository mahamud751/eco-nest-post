import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface StatusSelectProps {
  status: string;
  handleStatusChange: (event: SelectChangeEvent<string>) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({
  status,
  handleStatusChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        label="Select Status"
        name="status"
        value={status}
        onChange={handleStatusChange}
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inActive">InActive</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
