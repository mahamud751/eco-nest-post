"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import { Photo } from "@/services/types";

const ProductList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "photos",
      headerName: "Photos",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex">
          {params.value?.map(
            (photo: Photo, index: React.Key | null | undefined) => (
              <div key={index} className="flex mr-2">
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{ width: "36px", height: "36px", objectFit: "cover" }}
                />
              </div>
            )
          )}
        </div>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2">
          <p>{params.row.category?.name}</p>
        </div>
      ),
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discountPrice", headerName: "Discount Price", flex: 1 },
    { field: "flashsale", headerName: "Flashsale", flex: 1 },
    {
      field: "sizes",
      headerName: "Sizes",
      flex: 1,
      valueParser: (params) => params?.value?.map((item: any) => <p>{item}</p>),
    },

    {
      field: "colors",
      headerName: "Colors",
      flex: 1,
      valueParser: (params) => params?.value?.map((item: any) => <p>{item}</p>),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/products"
      deleteUrl="http://localhost:8080/v1/products"
      columns={columns}
      searchField="name"
      defaultHiddenColumns={[""]}
      link="product-list"
    />
  );
};

export default ProductList;
