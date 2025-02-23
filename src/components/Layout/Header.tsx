import { useQuery } from "@tanstack/react-query";
import { Flex, Layout, Menu, Popover, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { callGetAuthMe } from "../../apis/data";
import { roleOptions } from "../../constants/role";
import { useUserRole } from "../../contexts/userRoleContext";
import { useEffect, useState } from "react";

const { Header } = Layout;

export const HeaderComponent = () => {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState<string>(
    localStorage.getItem("selectedMenu") || "/campaign"
  );

  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedKey);
  }, [selectedKey]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    navigate(e.key);
  };

  const { data: loginUserData } = useQuery({
    queryKey: ["getAuthMe"],
    queryFn: callGetAuthMe,
  });

  const content = (
    <div>
      <p>{loginUserData?.email}</p>
      <p>{loginUserData?.company?.name}</p>
    </div>
  );

  const handleChange = (value: string) => {
    setUserRole(value);
  };

  const items = () => {
    return userRole === "admin"
      ? [
          { key: "/campaign", label: "캠페인" },
          { key: "/user", label: "사용자" },
          { key: "/error", label: "에러" },
        ]
      : [{ key: "/campaign", label: "캠페인" }];
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "#ffffffA6", margin: "20px" }}>WiseBirds</span>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        items={items()}
        style={{ flex: 1, minWidth: 0 }}
        onClick={handleMenuClick}
      />
      <Flex align="center" gap="middle">
        <Popover content={content} title={loginUserData?.name} trigger="click">
          <span style={{ color: "#fff", cursor: "pointer" }}>
            {loginUserData?.email}
          </span>
        </Popover>
        <Select
          defaultValue={userRole}
          style={{ width: 120 }}
          onChange={handleChange}
          options={roleOptions}
        />
      </Flex>
    </Header>
  );
};
