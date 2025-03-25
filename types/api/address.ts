// 주소찾기 - [B2C_NAU_011]
export class AddressSearchRequest {
  keyword!: string;
}
export class AddressSearchResponseItem {
  zipCode?: string;
  sido?: string;
  gugun?: string;
  addr?: string;
  addrJi?: string;
}
export type AddressSearchResponse = AddressSearchResponseItem[];
