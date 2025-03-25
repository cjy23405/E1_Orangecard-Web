// Options
export class AlertOptions {
  useClose?: boolean = false;
  title?: string = "";
  message?: string = "";
  buttons?: AlertButtonsOptions[] = [{}];
  outsideClose?: boolean = false;
  openAutoFocus?: (e: Event) => void;
}

// ButtonsOptions
export class AlertButtonsOptions {
  text?: string = "";
  type?: "action" | "cancel" = "action";
  callback?: (closeFn: () => void) => void = (closeFn) => {
    closeFn();
  };
  closeAutoFocus?: (e: Event) => void;
}
