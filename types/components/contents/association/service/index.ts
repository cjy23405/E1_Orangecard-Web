import type { LocationQueryValue } from "vue-router";
import type { AssociationServiceListResponseItem } from "@/types/api";

// query
export class AssociationServiceQuery {
  category?: LocationQueryValue | LocationQueryValue[] | string | number;
  keyword?: LocationQueryValue | LocationQueryValue[] | string | number;
}

// list
export interface AssociationServiceListItem
  extends AssociationServiceListResponseItem {
  summaryArray: string[];
}
export type AssociationServiceList = AssociationServiceListItem[];

// list group
export class AssociationServiceListGroupItem {
  category!: number;
  categoryName!: string;
  list!: AssociationServiceList;
}
export type AssociationServiceListGroup = AssociationServiceListGroupItem[];
