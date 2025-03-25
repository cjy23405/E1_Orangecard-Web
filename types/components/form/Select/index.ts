// Options
export type SelectOptions = SelectOption[];

// Option
export class SelectOption {
  value: string = "";
  text: string = "";
  disabled?: boolean = false;
}

// Selected
export type SelectSelected = SelectOption | null;
