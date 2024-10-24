import axios from "axios";
import React, { FormEvent, useRef, useState, useEffect } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

import MultipleImageUpload from "../molecules/MultipleImage";
import AddButton from "../atoms/AddButton";
import useExtractLinkPart from "@/services/hooks/useExtractLinkPart";
import { Photo } from "@/services/types";
import ImagePdfUpload from "../molecules/ImagePdfUpload";

interface AddFormProps {
  endpoint: string;
  id?: string;
  link: string;
  additionalFields?: React.ReactNode;
  additionalData?: { [key: string]: any };
  buttonText: string;
  resetFields?: () => void;
  isMultiple?: boolean;
  isFile?: boolean;
  isNoPhotoFile?: boolean;
  photosData: Photo[];
  setPhotosData?: React.Dispatch<React.SetStateAction<Photo[]>>;
  files?: File[];
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  numberFields?: string[];
}

const AddForm: React.FC<AddFormProps> = ({
  endpoint,
  id,
  link,
  photosData,
  setPhotosData,
  additionalFields,
  buttonText,
  resetFields,
  additionalData,
  isMultiple = false,
  isFile = false,
  isNoPhotoFile = false,
  files = [],
  setFiles,
  numberFields = [],
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const MySwal = withReactContent(Swal);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const link2 = link;
  const firstPart = useExtractLinkPart(link2);

  useEffect(() => {
    if (Array.isArray(photosData)) {
      setPreviews(photosData.map((photo) => photo.src));
    }
  }, [photosData]);

  const handleImagesChange = (files: File[]) => {
    const newPhotos = files.filter((file) => file.type.startsWith("image/"));

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...newPhotos.map((file) => URL.createObjectURL(file)),
    ]);

    if (setPhotosData) {
      const existingPhotos = Array.isArray(photosData) ? photosData : [];
      const updatedPhotos = [
        ...existingPhotos,
        ...newPhotos.map((file) => ({
          title: file.name,
          src: URL.createObjectURL(file),
        })),
      ];
      setPhotosData(updatedPhotos);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));

    if (setPhotosData) {
      const updatedPhotosData = photosData.filter((_, i) => i !== index);
      setPhotosData(updatedPhotosData);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFilesChange = (newFiles: File[]) => {
    const fileObjects = newFiles.map((file) => ({
      title: file.name,
      src: URL.createObjectURL(file),
    }));

    setFiles?.(newFiles);
    setPreviews(fileObjects.map((file) => file.src));
  };

  useEffect(() => {
    if (files.length > 0) {
      handleFilesChange(files);
    }
  }, [files]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      if (key === "sizes" || key === "colors") {
        try {
          data[key] = JSON.parse(value as string);
        } catch (e) {
          data[key] = value;
        }
      } else if (numberFields.includes(key)) {
        data[key] = parseFloat(value as string);
      } else {
        data[key] = value;
      }
    });

    if (
      additionalData?.userInfo &&
      typeof additionalData.userInfo === "object"
    ) {
      data.userInfo = JSON.stringify(additionalData.userInfo);
    }

    Object.assign(data, additionalData);

    try {
      if (!isNoPhotoFile) {
        const photoData: Photo[] = [];
        const validPhotos = photos.filter((photo) => photo instanceof File);

        if (validPhotos.length > 0) {
          for (const photo of validPhotos) {
            const uploadData = new FormData();
            uploadData.append("file", photo);
            uploadData.append("upload_preset", "upload");

            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
              uploadData
            );

            const { original_filename, secure_url } = uploadRes.data;

            photoData.push({
              title: original_filename,
              src: secure_url,
            });
          }
        }

        const existingPhotos = Array.isArray(photosData) ? photosData : [];
        const combinedPhotos: Photo[] = [
          ...existingPhotos.filter(
            (photo) => photo.src && !photo.src.startsWith("blob:")
          ),
          ...photoData,
        ];

        if (isFile && files && files.length > 0) {
          const base64Files: { [key: string]: any } = {};
          for (const file of files) {
            const base64 = await fileToBase64(file);
            base64Files[file.name] = base64;
          }
          data.files = Object.entries(base64Files).map(([title, src]) => ({
            title,
            src,
          }));
        } else {
          data.photos = combinedPhotos;
        }
      }

      const response =
        id === ""
          ? await axios.post(endpoint, data)
          : await axios.patch(endpoint, data);

      MySwal.fire(
        "Success",
        response.data.message || "Operation successful",
        "success"
      ).then(() => {
        router.push(link);
      });

      formRef.current?.reset();
      router.push(link);
      setPreviews([]);
      setPhotos([]);
      if (resetFields) resetFields();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorResponse = err.response.data;
        if (errorResponse && Array.isArray(errorResponse.errors)) {
          const validationErrors = errorResponse.errors;
          validationErrors.forEach(
            (error: { property: string; constraints: any }) => {
              const errorMessage = Object.values(error.constraints).join(", ");
              MySwal.fire(`${error.property} Error`, errorMessage, "error");
            }
          );
        } else {
          MySwal.fire(
            "Something went wrong.",
            errorResponse.message || "Unknown error",
            "error"
          );
        }
      } else if (err instanceof Error) {
        MySwal.fire("Something went wrong.", err.message, "error");
      } else {
        MySwal.fire(
          "Something went wrong.",
          "An unknown error occurred.",
          "error"
        );
      }
    }
  };

  return (
    <div className="md:mx-24 md:p-12">
      {id !== "" && (
        <div className="flex justify-end mb-5">
          <Link href={`${firstPart}-show/${id}`}>
            <Button
              variant="contained"
              startIcon={<RemoveRedEyeIcon />}
              className="mr-2 px-6 bg-neutral-950 text-white hover:bg-neutral-700"
            >
              Show{" "}
            </Button>
          </Link>
        </div>
      )}
      <Paper elevation={2} className="shadow-lg">
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box
            sx={{
              padding: {
                xs: 1,
                sm: 8,
              },
            }}
          >
            <Grid container spacing={2}>
              {additionalFields}
              {!isNoPhotoFile ? (
                isFile ? (
                  <Grid item xs={8}>
                    <ImagePdfUpload
                      onFilesChangePdf={setFiles}
                      isFile={true}
                      files={files}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={8}>
                    <MultipleImageUpload
                      photosData={previews}
                      onImagesChange={handleImagesChange}
                      onRemoveImage={handleRemoveImage}
                      isMultiple={isMultiple}
                    />
                  </Grid>
                )
              ) : (
                ""
              )}
            </Grid>
            <AddButton buttonText={buttonText} />
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AddForm;
