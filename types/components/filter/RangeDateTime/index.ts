import { plainToClass } from "class-transformer";

/* Extracted from v-calendar */
export type DatePickerModel = DatePickerRangeObject;
export type DateSource = Date | string | number;
export type DatePickerDate = DateSource | Partial<SimpleDateParts> | null;
export interface DatePickerRangeObject {
  start: Exclude<DatePickerDate, null>;
  end: Exclude<DatePickerDate, null>;
}
export interface SimpleDateParts {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

// modelValue
export class RangeDateTimeModelValueRange {
  start: string = "";
  end: string = "";
}

// DateTime
export class RangeDateTimeDateTime {
  text: string = "";
  date: Date | null = null;
  isValid: boolean = false;
}

// all DateTime
export class RangeDateTimeDateTimes {
  start: RangeDateTimeDateTime = plainToClass(RangeDateTimeDateTime, {});
  end: RangeDateTimeDateTime = plainToClass(RangeDateTimeDateTime, {});
}
