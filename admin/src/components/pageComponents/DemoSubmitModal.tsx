import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useAuth } from "@/services/hooks/auth";
import AddForm from "../templates/AddForm";

interface DemoSubmitModalProps {
  open: boolean;
  handleClose: () => void;
  orderId: string;
  refetch: () => void;
}

const DemoSubmitModal: React.FC<DemoSubmitModalProps> = ({
  open,
  handleClose,
  orderId,
}) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const photosData: { title: string; src: string }[] = [];
  const additionalFields = null;
  const additionalData = {
    advanceId: orderId,
    email: user?.email,
    userName: user?.name,
  };
  const handleFormReset = () => {
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded shadow-lg"
        sx={{ outline: "none" }}
        role="dialog"
        aria-labelledby="demo-submit-modal-title"
        aria-describedby="demo-submit-modal-description"
      >
        <AddForm
          endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/demo`}
          additionalFields={additionalFields}
          buttonText="Demo Submit"
          photosData={photosData}
          files={files}
          setFiles={setFiles}
          id=""
          link="customOrder-list"
          isFile={true}
          isMultiple={true}
          additionalData={additionalData}
          resetFields={handleFormReset}
        />
      </Box>
    </Modal>
  );
};

export default DemoSubmitModal;
