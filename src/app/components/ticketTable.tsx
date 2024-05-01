"use client";
import { useRef, useMemo, FC } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import TicketModal from "./modal";

const TicketTable: FC<TicketTableProps> = ({ tickets, setIsTicketUpdated }) => {
  const gridRef = useRef<GridApi | null>(null);

  const onGridReady = (params: GridReadyEvent) => {
    gridRef.current = params.api;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gridRef.current) {
      gridRef.current.setGridOption("quickFilterText", e.target.value);
    }
  };
  const colDefs: ColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", flex: 1 },
      {
        headerName: "Name",
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
        flex: 1,
      },
      { field: "email", headerName: "Email", flex: 1.5 },
      { field: "reason", headerName: "Reason", flex: 1 },
      { field: "description", headerName: "Description", flex: 2 },
      {
        field: "createdAt",
        headerName: "Date",
        valueGetter: (params) =>
          new Date(params.data.createdAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
        flex: 1,
      },
      { field: "update", headerName: "Update", cellRenderer: "ticketModal" },
    ],
    []
  );
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
    }),
    []
  );

  const components = useMemo(() => ({
    ticketModal: (params: ICellRendererParams) => (
      <TicketModal data={params.data} setIsTicketUpdated={setIsTicketUpdated}/>
    ),
  }), []);

  return (
    <div className="flex grow flex-col">
      <div>
        <input
          type="text"
          placeholder="Search Here..."
          onChange={onChange}
          className="w-full my-2 rounded-xl p-2 border-2"
        />
      </div>
      <div className={"ag-theme-material border-2 w-full h-full mb-20"}>
        <AgGridReact
          rowData={tickets}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          components={components}
        />
      </div>
    </div>
  );
};

export default TicketTable;
