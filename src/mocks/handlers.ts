// src/mocks/handlers.js
import { http } from "msw";
import {
  mockGetAuthMe,
  mockGetCampaigns,
  mockGetError,
  mockGetUsers,
  mockGetUsersEmail,
  mockPatchCampaignsStatus,
  mockPatchUsers,
  mockPostUsers,
} from "./service";

export const handlers = [
  http.get("/api/auth/me", mockGetAuthMe),
  http.get("/api/campaigns", mockGetCampaigns),
  http.patch("api/campaigns/:id", mockPatchCampaignsStatus),
  http.get("/api/users", mockGetUsers),
  http.post("/api/users", mockPostUsers),
  http.patch("/api/users/:id", mockPatchUsers),
  http.get("api/users/:email/exists", mockGetUsersEmail),
  http.get("api/error", mockGetError),
];
