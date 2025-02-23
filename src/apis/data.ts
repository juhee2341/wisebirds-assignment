import axios from "axios";
import {
  AuthMeType,
  Campaign,
  CampaignGridType,
  CreateUserParams,
  EditUserParams,
  GridParamsType,
  User,
} from "./type";

export const callGetAuthMe = async (): Promise<AuthMeType> => {
  const res = await axios.get("/api/auth/me");
  return res.data;
};

export const callGetCampaigns = async ({
  page,
  size,
}: GridParamsType): Promise<CampaignGridType<Campaign>> => {
  const res = await axios.get("/api/campaigns", {
    params: { page, size },
  });
  return res.data;
};

export const callPatchCampaignsStatus = async ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}): Promise<{ result: boolean; id: number }> => {
  const res = await axios.patch(`/api/campaigns/${id}`, { enabled });
  return res.data;
};

export const callGetUsers = async ({
  page,
  size,
}: GridParamsType): Promise<CampaignGridType<User>> => {
  const res = await axios.get("/api/users", {
    params: { page, size },
  });
  return res.data;
};

export const callPostUsers = async (params: CreateUserParams) => {
  const res = await axios.post("/api/users", {
    params,
  });
  return res.data;
};

export const callPatchUser = async (params: EditUserParams) => {
  const res = await axios.patch(`/api/users/${params.id}`, {
    name: params.name,
  });
  return res.data;
};

export const callGetEmailCheck = async (email: string) => {
  const res = await axios.get(`/api/users/${email}/exists`);
  return res.data;
};

export const callGetError = async () => {
  try {
    const res = await axios.get("/api/error");
    return res.data;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
    throw new Error("API 호출 중 오류가 발생했습니다."); // 에러 던지기
  }
};
