import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const MeasurementColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "class", headerName: "Class", flex: 1, minWidth: 100 },
  { field: "mobile", headerName: "Guardian Mobile", flex: 1, minWidth: 100 },
  { field: "total", headerName: "Total Set", flex: 1, minWidth: 100 },
  { field: "height", headerName: "Height", flex: 1, minWidth: 100 },
  { field: "category", headerName: "Category", flex: 1, minWidth: 100 },
  { field: "waist", headerName: "Waist", flex: 1, minWidth: 100 },
  { field: "waistSize", headerName: "Waist Size", flex: 1, minWidth: 100 },
  { field: "shoulder", headerName: "Shoulder", flex: 1, minWidth: 100 },
  {
    field: "sleeveLength",
    headerName: "Sleeve Length",
    flex: 1,
    minWidth: 100,
  },
  { field: "collar", headerName: "Collar", flex: 1, minWidth: 100 },
  { field: "length", headerName: "Length", flex: 1, minWidth: 100 },
  { field: "armhole", headerName: "Arm Hole", flex: 1, minWidth: 100 },
  {
    field: "sleeveOpening",
    headerName: "Sleeve Opening",
    flex: 1,
    minWidth: 100,
  },
  { field: "bottomHem", headerName: "Bottom Hem", flex: 1, minWidth: 100 },
  { field: "halfBody", headerName: "Half Body", flex: 1, minWidth: 100 },
  { field: "hips", headerName: "Hips", flex: 1, minWidth: 100 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => <StatusButton status={params.value} />,
  },
];

export default MeasurementColumns;
