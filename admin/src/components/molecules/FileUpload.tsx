import React, { ChangeEvent, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadBoxProps {
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isMultiple?: boolean;
  isFile?: boolean;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  onFileChange,
  isMultiple,
  isFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <label className="flex flex-col items-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full">
      <div className="flex items-center mb-4">
        <CloudUploadIcon className="w-16 h-16 mb-2 text-green-500" />
      </div>
      <p className="text-xl font-semibold text-black">Drop or select file</p>
      <div className="text-sm text-gray-500">
        Drop files here or click to{" "}
        <span className="text-green-500 underline">browse</span> through your
        machine.
      </div>
      {isFile ? (
        <input
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
      ) : isMultiple ? (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      )}
    </label>
  );
};

export default FileUploadBox;
