"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import MeasurementColumns from "@/components/organisms/MeasurementColumns";

const FaqList = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl="https://api.korbojoy.shop/v1/faq"
        deleteUrl="https://api.korbojoy.shop/v1/faq"
        columns={MeasurementColumns}
        searchField="name"
        link="faq-list"
      />
    </div>
  );
};

export default FaqList;
