import { ColDef, RowClickedEvent } from "ag-grid-community";
import { Button } from "antd";
import { formatDate } from "../../utils/formatDate";
import { ModalParams } from "./UserPage";

export function colDefs(
  showModal: ({ type, params }: ModalParams) => void
): ColDef[] {
  return [
    {
      field: "email",
      headerName: "아이디",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "name",
      headerName: "이름",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "last_login_at",
      headerName: "마지막 로그인 일시",
      cellStyle: { textAlign: "left" },
      cellRenderer: formatDate,
    },
    {
      field: "editBtn",
      headerName: "수정",
      cellRenderer: (params: RowClickedEvent) => {
        return (
          <Button
            color="primary"
            variant="text"
            onClick={() => showModal({ type: "edit", params: params })}
          >
            수정
          </Button>
        );
      },
      sortable: false,
    },
  ];
}
