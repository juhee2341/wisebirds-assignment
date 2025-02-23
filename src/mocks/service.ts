import { HttpResponseResolver, delay } from "msw";
import {
  mockGetAuthMeData,
  mockGetCampaignsData,
  mockGetUsersData,
  mockGetUsersEmailData,
  mockPatchUsersData,
  mockPostUsersData,
} from "./repository";
import { getMockResponseManager } from "./mockResponseManager";

export const mockGetAuthMe: HttpResponseResolver = async () => {
  await delay(200);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockGetAuthMeData,
  });
};

export const mockGetCampaigns: HttpResponseResolver = async () => {
  await delay(200);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockGetCampaignsData,
  });
};

export const mockPatchCampaignsStatus: HttpResponseResolver = async ({
  params,
  request,
}) => {
  // loading 처리 기능을 위해 2초 대기 설정
  await delay(2000);

  const { id } = params;
  const body = (await request.json()) as { enabled?: boolean };

  if (typeof body?.enabled !== "boolean") {
    return getMockResponseManager({
      statusCode: 400,
      errorData: { message: "Invalid request body" },
    });
  }

  return getMockResponseManager({
    statusCode: 200,
    successData: { result: true, id: Number(id) },
  });
};

export const mockGetUsers: HttpResponseResolver = async () => {
  await delay(200);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockGetUsersData,
  });
};

export const mockPostUsers: HttpResponseResolver = async () => {
  // loading 처리 기능을 위해 2초 대기 설정
  await delay(2000);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockPostUsersData,
  });
};

export const mockPatchUsers: HttpResponseResolver = async () => {
  // loading 처리 기능을 위해 2초 대기 설정
  await delay(2000);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockPatchUsersData,
  });
};

export const mockGetUsersEmail: HttpResponseResolver = async () => {
  // loading 처리 기능을 위해 2초 대기 설정
  await delay(2000);
  return getMockResponseManager({
    statusCode: 200,
    successData: mockGetUsersEmailData,
  });
};

export const mockGetError = async () => {
  await delay(200);
  return getMockResponseManager({
    statusCode: 500,
    successData: {},
  });
};
