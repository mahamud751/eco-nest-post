"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import MeasurementColumns from "@/components/organisms/MeasurementColumns";
import { BaseEditProps } from "@/services/types";

const MeasurementList: React.FC<BaseEditProps> = ({ params }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students?schoolId=${params.id}`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students`}
        columns={MeasurementColumns}
        searchField="name"
        link="measurement-list"
        isJustCreateData={false}
      />
    </div>
  );
};

export default MeasurementList;
