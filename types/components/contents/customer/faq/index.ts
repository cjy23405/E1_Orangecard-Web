import type { LocationQueryValue } from "vue-router";
import type { FaqListResponseItem } from "@/types/api";

// query
export class FaqQuery {
  category?: LocationQueryValue | LocationQueryValue[] | string | number;
  keyword?: LocationQueryValue | LocationQueryValue[] | string | number;
}

// list
export type FaqListItem = FaqListResponseItem;
export type FaqList = FaqListItem[];

// list group
export class FaqListGroupItem {
  category!: number;
  categoryName!: string;
  list!: FaqList;
}
export type FaqListGroup = FaqListGroupItem[];
