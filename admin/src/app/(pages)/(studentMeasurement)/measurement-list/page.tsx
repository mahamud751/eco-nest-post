"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import MeasurementColumns from "@/components/organisms/MeasurementColumns";

const MeasurementList = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students`}
        columns={MeasurementColumns}
        searchField="name"
        link="measurement-list"
      />
    </div>
  );
};

export default MeasurementList;
