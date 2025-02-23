import { Flex } from "antd";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { colDefs } from "./colDefs";
import { Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { callGetCampaigns } from "../../apis/data";
import { Campaign, CampaignObjective } from "../../apis/type";
import { useUserRole } from "../../contexts/userRoleContext";
import { useModal } from "../../contexts/modalContext";
import { EditCampaignStatusModal } from "./Modal/EditCampaignStatusModal";
import { useState } from "react";
import { RowClickedEvent } from "ag-grid-community";

const { Title } = Typography;

const GRID_PAGE_SIZE = 25;

export const CampaignPage = () => {
  const { closeModal, isOpen, openModal } = useModal();
  const { data: rowData } = useQuery({
    queryKey: ["getCampaigns"],
    queryFn: () => callGetCampaigns({ page: 1, size: GRID_PAGE_SIZE }),
  });
  const { userRole } = useUserRole();
  const [selectedRowData, setSelectedRowData] = useState<Campaign>({
    id: 0,
    name: "",
    enabled: false,
    campaign_objective: {} as CampaignObjective,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    video_views: 0,
    vtr: 0,
  });

  // 클릭 시 모달 열기
  const showModal = (param: RowClickedEvent) => {
    setSelectedRowData(param.data);
    openModal();
  };

  return (
    <>
      <Flex vertical>
        <Title level={3}>캠페인 관리</Title>
        <DataGrid<Campaign>
          data={rowData?.content}
          columnDefs={colDefs(userRole, showModal)}
        />
      </Flex>
      {isOpen && (
        <EditCampaignStatusModal
          open={isOpen}
          handleOk={openModal}
          handleCancel={closeModal}
          data={selectedRowData}
        />
      )}
    </>
  );
};
