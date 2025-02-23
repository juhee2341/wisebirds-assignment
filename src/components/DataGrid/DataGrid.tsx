import {
  AllCommunityModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "./ag-grid-custom.css";
import { useRef } from "react";

type DataGridPropsType<T> = {
  data: T[] | undefined;
  columnDefs: ColDef[];
};

ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * 데이터 그리드 컴포넌트입니다.
 * @param {Object} DataGridPropsType
 * @property {T[] | undefined} [data] 데이터를 입력합니다.
 * @property {ColDef[]} [columnDefs] 헤더 정보를 입력합니다.
 */
export const DataGrid = <T,>({ data, columnDefs }: DataGridPropsType<T>) => {
  const gridRef = useRef<AgGridReact>(null);

  // 그리드가 준비되면 sizeColumnsToFit() 실행
  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <AgGridReact
      ref={gridRef}
      rowData={data}
      columnDefs={columnDefs}
      domLayout="autoHeight"
      defaultColDef={{
        sortingOrder: ["desc", "asc"],
        sortable: true,
        unSortIcon: true,
        resizable: true,
        cellStyle: { textAlign: "center" },
      }}
      onGridReady={onGridReady}
      pagination={true}
      a
      paginationPageSize={25}
      paginationPageSizeSelector={false}
    />
  );
};
