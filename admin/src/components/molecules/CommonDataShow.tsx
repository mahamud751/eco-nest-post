"use client";
import * as React from "react";

import UseFormattedDate from "@/services/hooks/UseFormattedDate";
import { CommonData } from "@/services/types";
import StatusButton from "../atoms/StatusButton";
import Image from "next/image";
import Link from "next/link";

interface CommonDataShowProps {
  data: CommonData;
  isFile?: boolean;
}

const CommonDataShow: React.FC<CommonDataShowProps> = ({ data, isFile }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <strong className="font-bold block mb-2 text-gray-700">ID:</strong>
          <span className="font-normal text-gray-600">{data.id}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Name:</strong>
          <span className="font-normal text-gray-600">{data.name}</span>
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
      {isFile ? (
        <>
          <h3 className="text-lg font-bold mt-2">Files:</h3>
          <div className="flex">
            {data?.files?.map((detail: { src: string }, index: number) => (
              <Link
                key={index}
                href={`https://api.korbojoy.shop/public/uploads/${detail.src}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail.src.split("/").pop()}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold mt-2">Photo:</h3>
          <div className="flex">
            {data?.photos?.map((photo, index) => (
              <div key={index} className="mt-4 flex">
                {" "}
                <Image
                  src={photo.src}
                  alt={data.name}
                  className="rounded me-4"
                  width={80}
                  height={80}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CommonDataShow;
