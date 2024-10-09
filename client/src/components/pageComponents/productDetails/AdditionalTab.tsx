"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  SvgIcon,
} from "@mui/material";
import { Product } from "@/services/types";
import StarRatings from "react-star-ratings";
import {
  Person as PersonIcon,
  SentimentVeryDissatisfied as NoReviewIcon,
} from "@mui/icons-material";

interface AdditionalTabProps {
  product: Product;
}

const AdditionalTab = ({ product }: AdditionalTabProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <div className="flex justify-between items-center">
            <Image
              src={product?.photos[0]?.src || ""}
              alt="Selected Image"
              width={500}
              height={500}
              className="object-cover"
            />
            <div className="ms-12">
              <Typography variant="body1">{product?.fulldesc}</Typography>
            </div>
          </div>
        );
      case 1:
        return (
          <Typography variant="body1">
            Category: {product?.category?.name}
          </Typography>
        );
      case 2:
        return product?.reviews?.length ? (
          <div className="space-y-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              User Reviews and Ratings
            </Typography>
            {product?.reviews?.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-md rounded-lg"
              >
                <CardContent className="flex space-x-4 items-start">
                  <Avatar className="bg-blue-500 text-white">
                    <PersonIcon />
                  </Avatar>

                  <div className="flex-1">
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-900"
                    >
                      {item.userName || "Anonymous"}
                    </Typography>
                    <Typography variant="body2" className="text-yellow-600">
                      Rating: {item.rating} / 5
                    </Typography>
                    <div className="mt-2">
                      <StarRatings
                        rating={item.rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="24px"
                        starSpacing="4px"
                      />
                    </div>
                    <Typography variant="body2" className="text-gray-700 mt-2">
                      {item.comment || "No comment provided."}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-6">
            <SvgIcon
              component={NoReviewIcon}
              sx={{ fontSize: 60, color: "#ff7043" }}
            />
            <Typography
              variant="h6"
              className="font-semibold text-gray-600 mt-4"
            >
              No reviews found
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="product tabs">
        <Tab label="Description" />
        <Tab label="Additional Info" />
        <Tab label="Reviews" />
      </Tabs>
      <Box mt={2}>{renderContent()}</Box>
    </Box>
  );
};

export default AdditionalTab;
