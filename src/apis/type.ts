export type AuthMeType = {
  id: number;
  email: string;
  name: string;
  company: {
    id: number;
    name: string;
  };
};

export type CampaignObjective =
  | "WEBSITE_CONVERSIONS"
  | "WEBSITE_TRAFFIC"
  | "SALES"
  | "APP_INSTALLATION"
  | "LEAD"
  | "BRAND"
  | "VIDEO_VIEWS";

export type Campaign = {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: CampaignObjective;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
};

export type CampaignGridType<T> = {
  content: T[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort?: Record<string, unknown>;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};

export type GridParamsType = {
  page: number;
  size: number;
};

export type User = {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
};

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
};

export type EditUserParams = {
  id: string;
  name: string;
};
