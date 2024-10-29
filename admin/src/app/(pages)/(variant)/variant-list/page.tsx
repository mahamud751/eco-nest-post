"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const VariantList = () => {
  const columns = getCommonColumns([
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      valueParser: (params) =>
        params?.value?.map((item: any, index: number) => (
          <p key={index}>{item}</p>
        )),
    },
  ]);

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      columns={columns}
      searchField="name"
      link="variant-list"
    />
  );
};

export default VariantList;
