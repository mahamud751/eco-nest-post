"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const VendorRequestList = () => {

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "number", headerName: "Phone", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => <StatusButton status={params.value} />,
        },
    ];

    return (
        <DataTable
            fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/vendors`}
            deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/vendors`}
            columns={columns}
            searchField="name"
            // defaultHiddenColumns={["id"]}
            link="request-list"
        />
    );
};

export default VendorRequestList;
