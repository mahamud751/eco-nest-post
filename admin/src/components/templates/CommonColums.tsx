// components/templates/CommonColumns.ts
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import { Photo } from "@/services/types";
import Image from "next/image";

export const getCommonColumns = (
  additionalColumns: GridColDef[]
): GridColDef[] => {
  const commonColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      filterable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },

    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  ];
  const photoColumn: GridColDef = {
    field: "photos",
    headerName: "Photos",
    minWidth: 120,
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 flex">
        {params.value?.map(
          (photo: Photo, index: React.Key | null | undefined) => (
            <div key={index} className="flex mr-2">
              <Image src={photo.src} alt={photo.title} width={36} height={36} />
            </div>
          )
        )}
      </div>
    ),
  };
  const statusColumn: GridColDef = {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => <StatusButton status={params.value} />,
  };

  return [...commonColumns, ...additionalColumns, photoColumn, statusColumn];
};
