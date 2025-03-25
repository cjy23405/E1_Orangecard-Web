import type { LocationQueryValue } from "vue-router";

// query
export class ChargeHistoryQuery {
  type?: LocationQueryValue | LocationQueryValue[] | string | number;
  start?: LocationQueryValue | LocationQueryValue[] | string | number;
  end?: LocationQueryValue | LocationQueryValue[] | string | number;
}
