"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Paper, Button, TextField } from "@mui/material";
import {
  Edit,
  AddCircleOutlined,
  Search,
  Delete,
  FileDownload,
  ViewColumn,
  Print,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";

import useExtractLinkPart from "@/services/hooks/useExtractLinkPart";

interface DataTableProps {
  fetchUrl: string;
  link: string;
  deleteUrl: string;
  columns: GridColDef[];
  defaultHiddenColumns?: string[];
  searchField?: string;
  enableExport?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  fetchUrl,
  link,
  deleteUrl,
  columns,
  defaultHiddenColumns = [],
  searchField = "name",
  enableExport = true,
}) => {
  const MySwal = withReactContent(Swal);

  const link2 = link;
  const firstPart = useExtractLinkPart(link2);

  const [rows, setRows] = useState<any[]>([]);
  const [, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
    initializeColumnVisibility();
  }, [fetchUrl]);

  const fetchData = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setRows(response.data);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    if (value === "") {
      fetchData();
    } else {
      setRows((prevRows) =>
        prevRows.filter((row) => row[searchField].toLowerCase().includes(value))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmation = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${deleteUrl}/${id}`);
        MySwal.fire("Deleted!", "The item has been deleted.", "success");
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error("Error deleting data:", error);
        MySwal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmation = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (confirmation.isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) => axios.delete(`${deleteUrl}/${id}`))
        );
        MySwal.fire("Deleted!", "The items have been deleted.", "success");
        setRows((prevRows) =>
          prevRows.filter((row) => !selectedIds.includes(row.id))
        );
        setSelectedIds([]);
      } catch (error) {
        console.error("Error deleting data:", error);
        MySwal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  const handleExport = () => {
    const escapeCsvValue = (value: string | null | undefined) => {
      if (value === null || value === undefined) return "";
      const stringValue = value.toString();
      if (stringValue.includes(",") || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    // Ensure that the 'categoryName' field is included in the columns and headers
    const headers = columns
      .filter((col) => col.field !== "action" && columnVisibility[col.field])
      .map((col) => escapeCsvValue(col.headerName))
      .join(",");

    const rowsCsv = rows
      .map((row) => {
        // Extract the nested 'categoryName' value
        const categoryName = row.category?.name || "";

        return columns
          .filter(
            (col) => col.field !== "action" && columnVisibility[col.field]
          )
          .map((col) => {
            let value = row[col.field];
            if (col.field === "categoryName") {
              value = categoryName;
            }
            if (Array.isArray(value)) {
              return escapeCsvValue(value.join(","));
            }
            return escapeCsvValue(value);
          })
          .join(",");
      })
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rowsCsv}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleColumnModalOpen = () => {
    setOpenColumnModal(true);
  };

  const handleColumnModalClose = () => {
    setOpenColumnModal(false);
  };

  const handleResetColumns = () => {
    initializeColumnVisibility();
  };

  const handleSelectAll = () => {
    const newVisibility = columns.reduce((acc, col) => {
      acc[col.field] = !selectAll;
      return acc;
    }, {} as { [key: string]: boolean });
    setColumnVisibility(newVisibility);
    setSelectAll(!selectAll);
  };

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        {" "}
        <Link href={`/add-${firstPart}`}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlined />}
            className="mr-2 px-6 bg-neutral-950 text-white hover:bg-neutral-700"
          >
            Ceate
          </Button>
        </Link>
      </div>

      <Paper className="p-4 m-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: <Search className="mr-2" />,
            }}
            className="mr-4"
          />
          <div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleBulkDelete}
              disabled={selectedIds.length === 0}
              className="mr-2 text-emerald-950"
            >
              Delete
            </Button>
            {enableExport && (
              <Button
                startIcon={<FileDownload />}
                onClick={handleExport}
                className="mr-2 text-emerald-950"
              >
                Export
              </Button>
            )}
            <Button
              startIcon={<Print />}
              onClick={handlePrint}
              className="mr-2 text-emerald-950"
            >
              Print
            </Button>
            <Button
              startIcon={<ViewColumn />}
              onClick={handleColumnModalOpen}
              className="mr-2 text-emerald-950"
            ></Button>
          </div>
        </div>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={[
              ...columns.filter((col) => columnVisibility[col.field]),
              {
                field: "action",
                headerName: "Action",
                flex: 1,
                renderCell: (params) => (
                  <div>
                    <Link href={`${firstPart}-show/${params.id}`}>
                      {" "}
                      <RemoveRedEyeIcon color="success" />
                    </Link>
                    <Link href={`${link}/${params.id}`}>
                      {" "}
                      <Edit color="action" className="mx-2" />
                    </Link>
                    <Delete
                      color="error"
                      onClick={() => handleDelete(params.id.toString())}
                      className="cursor-pointer"
                    />
                  </div>
                ),
              },
            ]}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(
              newSelection: GridRowSelectionModel
            ) => {
              setSelectedIds(newSelection as string[]);
            }}
            sx={{
              "& .MuiDataGrid-container--top [role=row]": {
                backgroundColor: "#F4F6F8",
              },
            }}
          />
        </Box>
        <Modal
          open={openColumnModal}
          onClose={handleColumnModalClose}
          aria-labelledby="column-modal-title"
          aria-describedby="column-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="column-modal-title" variant="h6" component="h2">
              Manage Columns
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                }
                label="Select All"
              />
              {columns.map((column) => (
                <FormControlLabel
                  key={column.field}
                  control={
                    <Checkbox
                      checked={columnVisibility[column.field] || false}
                      onChange={() =>
                        handleColumnVisibilityChange(column.field)
                      }
                    />
                  }
                  label={column.headerName}
                />
              ))}
            </FormGroup>
            <Button onClick={handleResetColumns}>Reset</Button>
          </Box>
        </Modal>
      </Paper>
    </>
  );
};

export default DataTable;
