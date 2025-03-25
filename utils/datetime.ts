import { DateTime } from "luxon";

export const dateTimeFormat = (mode: string) => {
  switch (mode) {
    case "date":
      return "yyyy-MM-dd";
    case "time":
      return "HH:mm:ss";
    default:
      return "yyyy-MM-dd  HH:mm:ss";
  }
};

export const getStringToDate: (
  str: string,
  mode: string,
) => {
  text: string;
  date: Date | null;
  isValid: boolean;
} = (str, mode) => {
  let text = str.replace(/[^\d]/g, "");
  const textLength = text.length;

  if (!textLength) {
    return {
      text: "",
      date: null,
      isValid: false,
    };
  }

  const length = (() => {
    switch (mode) {
      case "date":
        return 8;
      case "time":
        return 6;
      default:
        return 14;
    }
  })();
  const zeroLength = length - textLength;
  const format = dateTimeFormat(mode);

  if (zeroLength > 0) {
    for (let i = 0; i < zeroLength; i++) {
      text += "0";
    }
  }

  switch (mode) {
    case "date":
      text = text.replace(/^(\d{4})(\d{2})(\d{2}).*/, "$1-$2-$3");
      break;
    case "time":
      text = text.replace(/^(\d{2})(\d{2})(\d{2}).*/, "$1:$2:$3");
      break;
    default:
      text = text.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}).*/,
        "$1-$2-$3  $4:$5:$6",
      );
      break;
  }

  const date = DateTime.fromFormat(text, format);
  const isValid = date.isValid;

  return {
    text,
    date: isValid ? date.toJSDate() : null,
    isValid,
  };
};
