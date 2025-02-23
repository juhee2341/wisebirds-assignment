import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Input, Modal } from "antd";
import { callGetEmailCheck, callPostUsers } from "../../../apis/data";
import { CreateUserParams } from "../../../apis/type";
import { useState } from "react";

type CreateUserProps = {
  open: boolean;
  handleCancel: () => void;
};

export const CreateUserModal = ({ open, handleCancel }: CreateUserProps) => {
  const [form] = Form.useForm();
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const createUserMutation = useMutation({
    mutationFn: callPostUsers,
  });

  const checkEmailMutation = useMutation({
    mutationFn: callGetEmailCheck,
  });

  const handleCheckEmail = async () => {
    if (!email) return;
    try {
      const response = await checkEmailMutation.mutateAsync(email);
      setIsDuplicate(response.result); // true면 중복, false면 사용 가능
    } catch (error) {
      console.error(error);
    }
  };

  const onCreate = async (values: CreateUserParams) => {
    try {
      await createUserMutation.mutateAsync(values);
      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title="사용자 생성"
      okText="생성"
      cancelText="취소"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
        loading: createUserMutation.isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="createUserModal"
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="email"
        label="아이디"
        rules={[
          {
            required: true,
            message: "아이디(이메일)을 입력하세요.",
          },
          {
            max: 50,
            min: 9,
            type: "email",
            message: "올바른 이메일 주소를 입력하세요.",
          },
          {
            validator: async (_, value) => {
              if (!value) return Promise.resolve();
              if (isDuplicate === true) {
                return Promise.reject(new Error("이미 사용중인 이메일입니다."));
              }
              return Promise.resolve();
            },
          },
        ]}
        hasFeedback
      >
        <Flex>
          <Input
            placeholder="영문, 숫자, 특수문자 조합 8~15 자"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsDuplicate(null); // 이메일 변경 시 중복 체크 초기화
            }}
          />
          <Button
            type="primary"
            loading={checkEmailMutation.isPending}
            disabled={!email}
            onClick={handleCheckEmail}
          >
            중복 확인
          </Button>
        </Flex>
        {isDuplicate !== null && (
          <div
            style={{ color: isDuplicate ? "red" : "green", marginTop: "4px" }}
          >
            {isDuplicate
              ? "이미 사용중인 이메일입니다."
              : "사용 가능한 이메일입니다."}
          </div>
        )}
      </Form.Item>
      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력하세요.",
          },
          {
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/,
            message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
          },
          {
            validator: (_, value) => {
              if (/\s/.test(value)) {
                return Promise.reject(
                  new Error("비밀번호에 공백을 포함할 수 없습니다.")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="repeat_password"
        label="비밀번호 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "비밀번호를 입력하세요.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
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
