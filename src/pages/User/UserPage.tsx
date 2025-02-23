import { Button, Flex } from "antd";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import Title from "antd/es/typography/Title";
import { colDefs } from "./colDefs";
import { useQuery } from "@tanstack/react-query";
import { callGetUsers } from "../../apis/data";
import { User } from "../../apis/type";
import { useModal } from "../../contexts/modalContext";
import { CreateUserModal } from "./Modal/CreateUserModal";
import { useState } from "react";
import { RowClickedEvent } from "ag-grid-community";
import { EditUserModal } from "./Modal/EditUserModal";

type ModalType = "create" | "edit" | null;

export type ModalParams = {
  type: ModalType;
  params?: RowClickedEvent;
};

export const UserPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedRowData, setSelectedRowData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    last_login_at: "",
  });
  const { data: rowData } = useQuery({
    queryKey: ["callGetUsers"],
    queryFn: () => callGetUsers({ page: 1, size: 25 }),
  });

  // 클릭 시 모달 열기
  const showModal = ({ type, params }: ModalParams) => {
    if (type === "edit") {
      setSelectedRowData(params?.data);
    }
    setModalType(type);
    openModal();
  };

  return (
    <>
      <Flex vertical gap="16px">
        <Title level={3}>사용자 관리</Title>
        <Button
          color="primary"
          variant="solid"
          style={{ width: "80px" }}
          onClick={() => showModal({ type: "create" })}
        >
          생성
        </Button>
        <DataGrid<User>
          data={rowData?.content}
          columnDefs={colDefs(showModal)}
        />
      </Flex>
      {modalType === "create" && (
        <CreateUserModal open={isOpen} handleCancel={closeModal} />
      )}
      {modalType === "edit" && (
        <EditUserModal
          open={isOpen}
          handleCancel={closeModal}
          data={selectedRowData}
        />
      )}
    </>
  );
};
