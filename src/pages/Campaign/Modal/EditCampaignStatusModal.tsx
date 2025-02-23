import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Modal, Typography } from "antd";
import { callPatchCampaignsStatus } from "../../../apis/data";
import { Campaign } from "../../../apis/type";

type EditCampaignStatusModalProps = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  data: Campaign;
};
const { Text } = Typography;

export const EditCampaignStatusModal = ({
  open,
  handleOk,
  handleCancel,
  data,
}: EditCampaignStatusModalProps) => {
  const campaignStatusMutation = useMutation({
    mutationFn: callPatchCampaignsStatus,
  });

  const updateCampaignStatus = async () => {
    try {
      await campaignStatusMutation.mutateAsync({
        id: data.id,
        enabled: !data.enabled,
      });
      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      width={400}
      open={open}
      title="캠페인 상태 변경"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={updateCampaignStatus}
          loading={campaignStatusMutation.isPending}
        >
          변경
        </Button>,
      ]}
    >
      <Flex vertical gap="8px">
        <Text strong>
          {data.name}을{" "}
          <span style={{ color: !data.enabled ? "#63ae1e" : "#716f6f" }}>
            {!data.enabled ? "활성화" : "비활성화"}
          </span>{" "}
          하시겠습니까?
        </Text>
        <Text type="secondary">
          *현재 상태: {data.enabled ? "활성화" : "비활성화"}
        </Text>
      </Flex>
    </Modal>
  );
};
