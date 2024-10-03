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
    vendors: User[];
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

  const { data: vendorOptions } = useFetch<User[]>(`users/vendors`);

  const handleVendorChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: User[]
  ) => {
    setSelectedVendors(newValue);
  };

  const handleSubmit = async () => {
    try {
      const updatedVendors = {
        vendorIds: selectedVendors.map((vendor) => vendor.id),
      };

      await axios.patch(
        `https://api.korbojoy.shop/v1/advance/${id}/assign`,
        updatedVendors
      );

      MySwal.fire("Updated", "Vendors successfully assigned!", "success");
      onClose();
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Something went wrong during assignment.", "error");
    }
  };

  return (
    <Modal open={!!data} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg mx-auto mt-20 w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Assign Vendor</h2>
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
        <div className="mt-6 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedVendors.length}
          >
            Assign Vendors
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerAssignVendor;
