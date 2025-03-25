import type { LocationQueryValue } from "vue-router";
import type { AssociationCardListResponseItem } from "@/types/api";

// query
export class AssociationCardQuery {
  category?: LocationQueryValue | LocationQueryValue[] | string | number;
  keyword?: LocationQueryValue | LocationQueryValue[] | string | number;
}

// list
export interface AssociationCardListItem
  extends AssociationCardListResponseItem {
  informationArray: string[];
}
export type AssociationCardList = AssociationCardListItem[];

// list group
export class AssociationCardListGroupItem {
  category!: number;
  categoryName!: string;
  list!: AssociationCardList;
}
export type AssociationCardListGroup = AssociationCardListGroupItem[];
