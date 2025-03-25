import type { LocationQueryValue } from "vue-router";

// query
export class AgreementQuery {
  id?: LocationQueryValue | LocationQueryValue[] | string | number;
}

// query
export class AgreementTabsItem {
  code!: string;
  name!: string;
}
export type AgreementTabs = AgreementTabsItem[];
