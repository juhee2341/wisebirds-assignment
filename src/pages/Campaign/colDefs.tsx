import { ColDef, RowClickedEvent } from "ag-grid-community";
import { Switch } from "antd";
import { CAMPAIGN_OBJECTIVE_MAP } from "../../constants/campaign";
import { CampaignObjective } from "../../apis/type";
import { formatNumber } from "../../utils/formatNumber";
import { formatPercent } from "../../utils/formatPercent";

export function colDefs(
  userRole: string,
  showModal: (params: RowClickedEvent) => void
): ColDef[] {
  return [
    {
      field: "enabled",
      headerName: "상태",
      width: 90,
      sortable: false,
      cellRenderer: (params: RowClickedEvent) => {
        // 토글 상태를 변경하기 위한 임시 변수
        const isChecked = params.data.enabled;

        return (
          <Switch
            defaultChecked={isChecked}
            onClick={() => showModal(params)}
            disabled={userRole === "viewer"}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "캠페인명",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "campaign_objective",
      headerName: "캠페인 목적",
      cellRenderer: (params: RowClickedEvent) => {
        const objective: CampaignObjective = params.data.campaign_objective;
        return CAMPAIGN_OBJECTIVE_MAP[objective];
      },
      cellStyle: { textAlign: "left" },
    },
    {
      field: "impressions",
      headerName: "노출 수",
      cellRenderer: formatNumber,
      cellStyle: { textAlign: "right" },
    },
    {
      field: "clicks",
      headerName: "클릭 수",
      cellRenderer: formatNumber,
      cellStyle: { textAlign: "right" },
    },
    {
      field: "ctr",
      headerName: "CTR",
      cellRenderer: formatPercent,
      cellStyle: { textAlign: "right" },
    },
    {
      field: "video_views",
      headerName: "동영상 조회수",
      cellRenderer: formatNumber,
      cellStyle: { textAlign: "right" },
    },
    {
      field: "vtr",
      headerName: "VTR",
      cellRenderer: formatPercent,
      cellStyle: { textAlign: "right" },
    },
  ];
}
