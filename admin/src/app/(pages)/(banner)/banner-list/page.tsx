"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const BannerList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl="https://api.korbojoy.shop/v1/banners"
      deleteUrl="https://api.korbojoy.shop/v1/banners"
      columns={columns}
      searchField="name"
      link="banner-list"
    />
  );
};

export default BannerList;
