import type { SnsCodeLower } from "@/types/common";

// 아이디 찾기(CI) - [B2C_NAU_005]
export class ForgotIdRequest {
  ciKey!: string;
}
export class ForgotIdResponseSns {
  snsType!: SnsCodeLower;
  snsId!: string;
  editDateTime!: string;
}
export class ForgotIdResponse {
  loginId!: string;
  snsInfoList?: ForgotIdResponseSns[];
  webSbscDt!: string;
}

// 비밀번호 변경(CI) - [B2C_NAU_006]
export class ForgotPwRequest {
  ciKey!: string;
  password!: string;
}
