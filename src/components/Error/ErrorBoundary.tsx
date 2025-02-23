import { Button, Modal } from "antd";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

type FetchErrorBoundaryProps = {
  children: React.ReactNode;
};

export const FetchErrorBoundary = ({ children }: FetchErrorBoundaryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <ErrorBoundary
      fallback={
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
          okText="캠페인페이지로 이동"
          footer={[
            <Button type="primary" onClick={handleOk}>
              확인
            </Button>,
          ]}
        >
          <div style={{ textAlign: "left", padding: "20px 0" }}>
            <p>에러가 발생했습니다.</p>
            <p style={{ paddingBottom: "24px" }}>
              같은 현상이 반복되면 고객센터로 문의 바랍니다.
            </p>
            <div>
              <p>※ 고객센터</p>
              <p>- email: helpdesk@wisebirds.ai</p>
            </div>
          </div>
        </Modal>
      }
    >
      <Suspense fallback={<>suspense fallback</>}>{children}</Suspense>
    </ErrorBoundary>
  );
};
