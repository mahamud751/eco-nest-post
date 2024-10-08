"use client";
import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
import { Feedbacks, Photo } from "@/services/types";
import { useAuth } from "@/services/hooks/auth";
interface AddFormProps {
  photosData: Photo[];
}

const Feedback: React.FC<AddFormProps> = ({ photosData }) => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: Feedbacks[];
    total: number;
    perPage: number;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchOrders = async () => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{
        data: Feedbacks[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/myBooking?email=${user.email}&allOrder=yes&page=${page}&perPage=${rowsPerPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  useEffect(() => {
    if (photosData.length) {
      setPreviews(photosData.map((photo) => photo.src));
    }
  }, [photosData, photos]);

  const handleImagesChange = (files: File[]) => {
    const newPhotos = files.filter((file) => file.type.startsWith("image/"));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...newPhotos.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setPhotos(updatedPhotos);
    setPreviews(updatedPreviews);

    if (fileInputRef.current) {
      const newFiles = Array.from(fileInputRef.current.files || []).filter(
        (_, i) => i !== index
      );
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
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

      const data2 = {
        comment,
        userName: user?.name,
        productId: selectedProductId,
        rating,
        photos: combinedPhotos,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/v1/reviews`, data2);

      Swal.fire("Good job!", "Successfully added", "success");
      handleClose();
    } catch (error) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      Swal.fire(
        "Error",
        errorResponse?.response?.data?.message || "Failed to submit review",
        "error"
      );
    }
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleImagesChange(selectedFiles);
  };

  const handleOpen = (productId: string) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment("");
    setPhotos([]);
    setPreviews([]);
    setRating(0);
    setSelectedProductId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-center mb-6 text-green-600">
        Product Feedback
      </h1>

      {data?.data.length ? (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-[#FF9800]">
              <TableRow>
                <TableCell className="p-4 text-white font-bold">
                  Product Image
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Product Name
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Views
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Status
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <TableCell className="p-4">{item?.product?.name}</TableCell>
                  <TableCell className="p-4">
                    <div className="flex">
                      {item?.product?.photos.map((img, index) => (
                        <div key={index} className="cursor-pointer">
                          <Image
                            src={img.src}
                            alt={img.title}
                            width={100}
                            height={100}
                            className={`border-2 rounded-lg ms-3 w-[40px]`}
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="p-4">{item?.product?.views}</TableCell>
                  <TableCell className="p-4">
                    <Button
                      variant="contained"
                      color={
                        item?.product?.status === "active" ? "success" : "error"
                      }
                      size="small"
                      style={{
                        borderRadius: "5px",
                        textTransform: "none",
                        border: "none",
                      }}
                    >
                      {item?.product?.status}
                    </Button>
                  </TableCell>
                  <TableCell className="p-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(item.product.id)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-6 mb-5">
            <TablePagination
              component="div"
              count={data?.total || 0}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows per page:"
              showFirstButton
              showLastButton
            />
          </div>
        </TableContainer>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <p>
            Please provide a detailed review for the product with the given ID:{" "}
            {selectedProductId}
          </p>

          <form id="review-form" onSubmit={handleReviewSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Comment"
              type="text"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              className="mt-4"
            />
            {previews.length > 0 && (
              <div className="mt-4 flex">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" form="review-form" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Feedback;
