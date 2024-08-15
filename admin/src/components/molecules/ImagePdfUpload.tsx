import React, { ChangeEvent, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import FileUploadBox from "./FileUpload";

interface ImagePdfUploadProps {
  files?: File[];
  onFilesChangePdf?: (files: File[]) => void;
  isMultiple?: boolean;
  isFile?: boolean;
}

const ImagePdfUpload: React.FC<ImagePdfUploadProps> = ({
  files = [],
  onFilesChangePdf,
  isMultiple,
  isFile,
}) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    const previews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  console.log(filePreviews);

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onFilesChangePdf) {
      const fileList = e.target.files;
      if (fileList) {
        const fileArray = Array.from(fileList);
        const urls = fileArray.map((file) => URL.createObjectURL(file));
        setFilePreviews((prev) => [...prev, ...urls]);
        onFilesChangePdf(fileArray);
      }
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
        {filePreviews.map((preview, index) => (
          <div key={index} className="mt-3 relative inline-block mx-5">
            {preview.endsWith(".pdf") ? (
              <iframe
                src={preview}
                title={`Preview ${index}`}
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <Image
                src={preview}
                alt={`Preview ${index}`}
                width={200}
                height={200}
                style={{ width: "100%", height: "120px" }}
              />
            )}
            <ClearIcon
              onClick={() =>
                setFilePreviews((prev) => prev.filter((_, i) => i !== index))
              }
              className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePdfUpload;
