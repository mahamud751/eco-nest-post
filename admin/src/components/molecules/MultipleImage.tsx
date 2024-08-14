import React, { ChangeEvent } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";

import FileUploadBox from "./FileUpload";

interface MultipleImageUploadProps {
  photosData: string[];
  onImagesChange: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  isMultiple: boolean;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  photosData,
  onImagesChange,
  onRemoveImage,
  isMultiple,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onImagesChange(selectedFiles);
  };

  return (
    <div>
      <FileUploadBox onFileChange={handleFileChange} isMultiple={isMultiple} />
      <div className="mt-12 d-flex flex-wrap">
        {photosData?.map((photo, index) => (
          <div key={index} className="mt-3 relative inline-block mx-5">
            <Image
              src={photo}
              alt={`Preview ${index}`}
              width={200}
              height={200}
              style={{ width: "100%", height: "120px" }}
            />

            <ClearIcon
              onClick={() => onRemoveImage(index)}
              className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
