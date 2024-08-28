import React, { useState } from "react";
import { Modal, Box, TextField, Autocomplete, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { User } from "@/services/types";
import useFetch from "@/services/hooks/UseRequest";

interface CustomerAssignVendorProps {
  data: {
    id: string;
    vendors: User[]; // Should be User[] since vendors are users
  };
  onClose: () => void;
}

const CustomerAssignVendor: React.FC<CustomerAssignVendorProps> = ({
  data,
  onClose,
}) => {
  const MySwal = withReactContent(Swal);
  const { id, vendors: userVendors } = data;
  const [selectedVendors, setSelectedVendors] = useState<User[]>(
    userVendors || []
  );

  const { data: vendorOptions } = useFetch<User>(`users/vendors`);

  const handleVendorChange = (
    event: React.ChangeEvent<{}>,
    newValue: User[] // Use the correct type here
  ) => {
    setSelectedVendors(newValue);
  };

  const handleSubmit = async () => {
    try {
      // Convert selected vendor IDs into a single comma-separated string
      const vendorIdString = selectedVendors
        .map((vendor) => vendor.id)
        .join(",");

      const updatedStatus = {
        vendorId: vendorIdString, // Now a single string
      };

      await axios.patch(
        `http://localhost:8080/v1/advance/${id}/assign`,
        updatedStatus
      );

      MySwal.fire("Updated", "Success");
      onClose();
    } catch (err) {
      console.error(err);
      MySwal.fire("Something went wrong.", "Error");
    }
  };

  return (
    <Modal open={!!data} onClose={onClose}>
      <Box className="p-4 bg-white rounded shadow-md mx-auto my-20 w-3/4">
        <h2 className="text-lg font-bold mb-4">Assign Vendor</h2>
        <Autocomplete
          multiple
          options={vendorOptions || []}
          getOptionLabel={(option) => option.name}
          value={selectedVendors}
          onChange={handleVendorChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Vendors" variant="outlined" />
          )}
        />
        <div className="mt-4 flex justify-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Assign
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerAssignVendor;
