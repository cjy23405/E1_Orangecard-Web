import { useMutation } from "@tanstack/vue-query";
import type {
  ForgotIdRequest,
  ForgotIdResponse,
  ForgotPwRequest,
} from "@/types/api";

// 아이디 찾기(CI)
export const useApiForgotId = (key: number | string = "") => {
  const endpoint = useApiEndpoint("forgotId");

  return useMutation({
    mutationKey: ["forgotId", key],
    mutationFn: (data: ForgotIdRequest) => {
      return $api<ForgotIdRequest, ForgotIdResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 비밀번호 변경(CI)
export const useApiForgotPw = (key: number | string = "") => {
  const endpoint = useApiEndpoint("forgotPw");

  return useMutation({
    mutationKey: ["forgotPw", key],
    mutationFn: (data: ForgotPwRequest) => {
      return $api<ForgotPwRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
