"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const DiscountList = () => {
  const columns = getCommonColumns([
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => <p>{"৳ " + params?.row?.amount}</p>,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p>
            {new Date(params.row.startDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p>
            {new Date(params.row.endDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      ),
    },
  ]);

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/discounts`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/discounts`}
      columns={columns}
      searchField="name"
      link="discount-list"
    />
  );
};

export default DiscountList;
