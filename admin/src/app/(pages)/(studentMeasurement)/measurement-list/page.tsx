"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import MeasurementColumns from "@/components/organisms/MeasurementColumns";
import { useAuth } from "@/services/hooks/auth";

const MeasurementList = () => {
  const { user } = useAuth();
  const fetchUrl =
    user?.role === "schoolManager"
      ? `${process.env.NEXT_PUBLIC_BASEURL}/v1/students?email=${user.email}`
      : `${process.env.NEXT_PUBLIC_BASEURL}/v1/students`;
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={fetchUrl}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students`}
        columns={MeasurementColumns}
        searchField="name"
        link="measurement-list"
      />
    </div>
  );
};

export default MeasurementList;
