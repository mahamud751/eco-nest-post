import React, { useState } from "react";
import { Modal, Box, TextField, Autocomplete, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { User } from "@/services/types";
import useFetch from "@/services/hooks/UseRequest";

interface CustomerAssignRiderProps {
  data: {
    id: string;
    riders: User[];
  };
  onClose: () => void;
}

const CustomerAssignRider: React.FC<CustomerAssignRiderProps> = ({
  data,
  onClose,
}) => {
  const MySwal = withReactContent(Swal);
  const { id, riders: userRiders } = data;

  const [selectedRiders, setSelectedRiders] = useState<User[]>(
    userRiders || []
  );
  const { data: riderResponse } = useFetch<{ data: User[] }>(
    `users?role=rider`
  );

  const handleRiderChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: User[]
  ) => {
    setSelectedRiders(newValue);
  };

  const handleSubmit = async () => {
    try {
      const updatedRiders = {
        riderIds: selectedRiders?.map((rider) => rider?.id),
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/${id}/assign`,
        updatedRiders
      );

      MySwal.fire("Updated", "Riders successfully assigned!", "success");
      onClose();
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Something went wrong during assignment.", "error");
    }
  };

  return (
    <Modal open={!!data} onClose={onClose}>
      <Box className="p-6 bg-white rounded-lg shadow-lg mx-auto mt-20 w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Assign Rider</h2>
        <Autocomplete
          multiple
          options={riderResponse?.data || []}
          getOptionLabel={(option) => option?.name}
          value={selectedRiders}
          onChange={handleRiderChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Riders" variant="outlined" />
          )}
        />
        <div className="mt-6 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedRiders.length}
          >
            Assign Riders
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerAssignRider;
