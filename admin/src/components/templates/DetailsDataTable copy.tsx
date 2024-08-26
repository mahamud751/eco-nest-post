"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface DataTableProps {
  fetchUrl: string;
  columns: GridColDef[];
  defaultHiddenColumns?: string[];
}

const DetailsDataTable: React.FC<DataTableProps> = ({
  fetchUrl,
  columns,
  defaultHiddenColumns = [],
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchData();
    initializeColumnVisibility();
  }, [fetchUrl]);

  const fetchData = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setRows(response.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const initializeColumnVisibility = () => {
    const initialVisibility: { [key: string]: boolean } = {};
    columns.forEach((col) => {
      initialVisibility[col.field] = !defaultHiddenColumns.includes(col.field);
    });
    setColumnVisibility(initialVisibility);
  };

  return (
    <>
      <Paper className="p-4 m-4 shadow-lg">
        <div>
          <DataGrid
            rows={rows}
            columns={[...columns.filter((col) => columnVisibility[col.field])]}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-container--top [role=row]": {
                backgroundColor: "#F4F6F8",
              },
            }}
          />
        </div>
      </Paper>
    </>
  );
};

export default DetailsDataTable;
