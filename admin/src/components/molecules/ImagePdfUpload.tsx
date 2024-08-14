import React, { ChangeEvent, useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";

import FileUploadBox from "./FileUpload";

interface MultipleImageUploadProps {
  files?: File[];
  onRemoveImage?: (index: number) => void;
  onFilesChangePdf?: (files: File[]) => void;
  isMultiple?: boolean;
  isFile?: boolean;
}

const ImagePdfUpload: React.FC<MultipleImageUploadProps> = ({
  files = [],
  onFilesChangePdf,
  onRemoveImage,
  isMultiple,
  isFile,
}) => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(files)) {
      // Clean up previous URLs
      fileUrls.forEach((url) => URL.revokeObjectURL(url));

      // Generate new URLs
      const urls = files.map((file) => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        }
        return "";
      });
      setFileUrls(urls);
    }

    // Clean up URLs when component unmounts
    return () => {
      fileUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onFilesChangePdf) {
      const fileList = e.target.files;
      if (fileList) {
        const fileArray = Array.from(fileList);
        const urls = fileArray.map((file) => URL.createObjectURL(file));
        setFileUrls((prevUrls) => [...prevUrls, ...urls]);
        onFilesChangePdf(fileArray);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setFileUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((_, i) => i !== index);
      return updatedUrls;
    });

    if (onRemoveImage) {
      onRemoveImage(index);
    }
  };

  return (
    <div>
      <FileUploadBox
        onFileChange={handlePdfChange}
        isMultiple={isMultiple}
        isFile={isFile}
      />
      <div className="mt-12 d-flex flex-wrap">
        {fileUrls.map((fileUrl, index) => (
          <div key={index} className="mt-3 relative inline-block mx-5">
            {/* Conditionally render preview based on file type */}
            {fileUrl.endsWith(".pdf") ? (
              <iframe
                src={fileUrl}
                title={`Preview ${index}`}
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <Image
                src={fileUrl}
                alt={`Preview ${index}`}
                width={200}
                height={200}
                style={{ width: "100%", height: "120px" }}
              />
            )}
            <ClearIcon
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePdfUpload;
