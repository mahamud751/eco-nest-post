import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@/services/hooks/auth";
import FileUploadBox from "../molecules/FileUpload";

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
  refetch,
}) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      Swal.fire("Warning", "Please select a file", "warning");
      return;
    }

    const data: {
      advanceId: string;
      userName: string;
      email: string;
      files: { title: string; src: string }[];
    } = {
      advanceId: orderId,
      userName: user?.name || "",
      email: user?.email || "",
      files: [],
    };

    try {
      // Convert each file to base64 and add it to the data object
      for (const file of files) {
        const base64 = await fileToBase64(file);
        data.files.push({ title: file.name, src: base64 });
      }

      await axios.post(`http://localhost:8080/v1/demo`, data);
      Swal.fire("Success", "File uploaded successfully", "success");
      refetch(); // Refresh the data in the table
      handleClose(); // Close the modal
      setFiles([]);
      setFilePreviews([]);
    } catch (err) {
      // Handle error based on type
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload file";
      Swal.fire("Error", `Failed to upload file: ${errorMessage}`, "error");
    }
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
        <h2 id="demo-submit-modal-title" className="text-lg font-bold mb-4">
          Upload Files
        </h2>
        <form onSubmit={handleSubmit}>
          <FileUploadBox onFileChange={handleFileChange} isFile={true} />
          <div className="flex flex-wrap mb-4">
            {filePreviews.map((preview, index) => (
              <div key={index} className="relative w-32 h-32 mx-2 mb-2">
                {preview.endsWith(".pdf") ? (
                  <iframe
                    src={preview}
                    title={`Preview ${index}`}
                    className="w-full h-full"
                    aria-label={`PDF preview ${index}`}
                  />
                ) : (
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                    aria-label={`Image preview ${index}`}
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="submit" variant="contained" color="primary">
            Upload File
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DemoSubmitModal;
