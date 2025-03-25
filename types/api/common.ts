// Request header
export class RequestHeader {
  appVer?: string;
  appRscVer?: string;
  apiNo?: string;
  channel?: string;
  ip?: string;
  osType?: string;
  pageNm?: string;
  sig?: string;
  requestId?: string;
}

// Request page
export class RequestPage {
  pageNum?: number = 1;
  pageSize?: number = 10;
  sort?: number = 0;
}

// Request
export class Request<T = unknown> {
  header?: RequestHeader;
  data?: T;
  page?: RequestPage;
}

// Response header success
export class ResponseHeaderSuccess {
  code!: string;
  message!: string;
  result!: object | null;
  success!: boolean;
}

// Response header error
export class ResponseHeaderError {
  code!: string;
  message!: string;
  result!: object | null;
  success!: boolean;
}

// Response page
export class ResponsePage {
  pageNum?: number;
  pageSize?: number;
  sort?: number | null;
  totalCount?: number;
}

// Response
export class Response<T = unknown> {
  header?: ResponseHeaderSuccess | ResponseHeaderError;
  data?: T;
  page?: ResponsePage;
}

// Response error
export class ResponseError {
  header?: ResponseHeaderError;
  data?: object;
  page?: ResponsePage;
}

// API Error
export class ApiError<T = ResponseError> extends Error {
  data: T;

  constructor(message: string, data: T) {
    super(message);
    this.name = "ApiError";
    this.data = data;
  }
}
