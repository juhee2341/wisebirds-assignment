import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { callPatchUser } from "../../../apis/data";
import { EditUserParams, User } from "../../../apis/type";

type EditUserProps = {
  open: boolean;
  handleCancel: () => void;
  data: User;
};

export const EditUserModal = ({ open, handleCancel, data }: EditUserProps) => {
  const [form] = Form.useForm();
  const editUserMutation = useMutation({
    mutationFn: callPatchUser,
  });

  const onCreate = async (values: EditUserParams) => {
    try {
      await editUserMutation.mutateAsync(values);
      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title="사용자 수정"
      okText="저장"
      cancelText="취소"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
        loading: editUserMutation.isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="editUserModal"
          initialValues={{
            id: data.email,
            name: data.name,
          }}
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="id"
        label="아이디"
        rules={[{ required: true, message: "아이디를 찾을 수 없습니다." }]}
      >
        {data.email}
      </Form.Item>
      <Form.Item
        name="name"
        label="이름"
        rules={[
          { required: true, message: "이름을 입력하세요." },
          {
            pattern: /^[가-힣a-zA-Z]{1,16}$/,
            message:
              "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
          },
          {
            validator: (_, value) => {
              if (/\s/.test(value)) {
                return Promise.reject(
                  new Error("이름에 공백을 포함할 수 없습니다.")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
    </Modal>
  );
};
