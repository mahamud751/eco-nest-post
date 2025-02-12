import * as React from "react";
import { Paper } from "@mui/material";
import Image from "next/image";
import { Review } from "@/services/types";
import StatusButton from "../atoms/StatusButton";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";

interface ReviewShowProps {
  data: Review;
}

const ReviewShow: React.FC<ReviewShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <strong className="font-bold block mb-2 text-gray-700">ID:</strong>
          <span className="font-normal text-gray-600">{data.id}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            User Name:
          </strong>
          <span className="font-normal text-gray-600">{data.userName}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Comment:
          </strong>
          <span className="font-normal text-gray-600">{data.comment}</span>
        </div>

        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Status:
          </strong>
          <StatusButton status={data.status} />
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Created At:
          </strong>
          <span className="font-normal text-gray-600">
            {UseFormattedDate(data.createdAt)}
          </span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Updated At:
          </strong>
          <span className="font-normal text-gray-600">
            {UseFormattedDate(data.updatedAt)}
          </span>
        </div>
      </div>

      <>
        <h3 className="text-lg font-bold mt-2">Photo:</h3>
        <div className="flex">
          {data?.photos?.map((photo, index) => (
            <div key={index} className="mt-4 flex">
              {" "}
              <Image
                src={photo.src}
                alt={"review"}
                className="rounded me-4"
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>
      </>
    </Paper>
  );
};

export default ReviewShow;
