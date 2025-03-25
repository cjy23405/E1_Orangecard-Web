import type { FuelCode, BooleanYN } from "@/types/common";

// 이벤트 목록 조회 - [B2C_NAU_018]
export class EventListRequest {
  ongoingEvent!: boolean;
}
export class EventListResponseItem {
  postingNo!: number;
  eventTitle!: string;
  eventStartDt!: string;
  eventEndDt!: string;
  fuelTypeList!: FuelCode[];
  thumbnailImage!: string;
  webMainBannerImage!: string;
  mobileMainBannerImage!: string;
  popupUrl!: string;
}
export type EventListResponse = EventListResponseItem[];

// 이벤트 상세 조회 - [B2C_NAU_019]
export class EventDetailRequest {
  postingNo!: number;
}
export class EventDetailResponse {
  postingNo!: number;
  eventTitle!: string;
  eventStartDt!: string;
  eventEndDt!: string;
  eventNote!: string;
  popupUrl!: string;
  webContents!: string;
  mobileContents!: string;
  fuelTypeList!: FuelCode[];
  announcementDate!: string;
  thumbnailImage!: string;
}

// 이벤트 당첨자 목록 조회 - [B2C_NAU_025]
export class EventAnnouncementListResponseItem {
  postingNo!: number;
  title!: string;
  entryDt!: string;
}
export type EventAnnouncementListResponse = EventAnnouncementListResponseItem[];

// 이벤트 당첨자 상세 조회 - [B2C_NAU_026]
export class EventAnnouncementDetailRequest {
  postingNo!: number;
  customerKey?: string;
}
export class EventAnnouncementDetailResponse {
  [key: string]: number | BooleanYN | FuelCode[] | string | null;
  postingNo!: number;
  title!: string;
  eventTitle!: string | null;
  announcementDt!: string | null;
  winMessage!: string | null;
  winNote!: string | null;
  contents!: string;
  winItem1!: string | null;
  winConts1!: string | null;
  winItem2!: string | null;
  winConts2!: string | null;
  winItem3!: string | null;
  winConts3!: string | null;
  winItem4!: string | null;
  winConts4!: string | null;
  winItem5!: string | null;
  winConts5!: string | null;
  winItem6!: string | null;
  winConts6!: string | null;
  winItem7!: string | null;
  winConts7!: string | null;
  winItem8!: string | null;
  winConts8!: string | null;
  winItem9!: string | null;
  winConts9!: string | null;
  winItem10!: string | null;
  winConts10!: string | null;
  joinCompletionYn!: BooleanYN;
  fuelTypeList!: FuelCode[];
  eventStartDt!: string;
  eventEndDt!: string;
}

// PermaLink 캠페인 참여 - [B2C_EVT_016]
export class EventCampaignEntryPermaLinkRequest {
  campaignId!: string;
}

// PermaLink 이벤트 참여 - [B2C_EVT_017]
export class EventEntryPermaLinkRequest {
  postingNo!: number;
}
