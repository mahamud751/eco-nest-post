"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const DiscountList = () => {
  const columns = getCommonColumns([]);

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
