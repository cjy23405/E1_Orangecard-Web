/* Extracted from v-calendar */
export type DatePickerModel = DatePickerDate;
export type DateSource = Date | string | number;
export type DatePickerDate = DateSource | Partial<SimpleDateParts> | null;
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
export class DateTimeInputDateTime {
  text: string = "";
  date: Date | null = null;
  isValid: boolean = false;
}
