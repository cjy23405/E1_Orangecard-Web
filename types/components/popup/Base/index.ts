// Buttons
export class PopupBaseButtonsItem {
  text?: string = "";
  type?: "action" | "cancel" = "action";
  callback?: (closeFn: () => void) => void = (closeFn) => {
    closeFn();
  };
  closeAutoFocus?: (e: Event) => void;
}
export type PopupBaseButtons = PopupBaseButtonsItem[];
