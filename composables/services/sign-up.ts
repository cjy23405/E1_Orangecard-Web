import { useQuery, useMutation } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import type {
  SignUpIdCheckRequest,
  SignUpSnsCheckRequest,
  SignUpSnsCheckResponse,
  SignUpPhoneCheckCodeRequest,
  SignUpPhoneCheckCodeResponse,
  SignUpCiCheckRequest,
  SignUpCiCheckResponse,
  SignUpBasicRequest,
  SignUpBasicResponse,
  SignUpSnsRequest,
  SignUpSnsResponse,
  SignUpConnectToCiRequest,
  SignUpTermsResponse,
} from "@/types/api";

// 로그인 아이디 중복체크
export const useApiSignUpIdCheck = (key: number | string = "") => {
  const endpoint = useApiEndpoint("idCheck");

  return useMutation({
    mutationKey: ["signUpIdCheck", key],
    mutationFn: (data: SignUpIdCheckRequest) => {
      return $api<SignUpIdCheckRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// SNS 로그인 등록여부 체크
export const useApiSignUpSnsCheck = (key: number | string = "") => {
  const endpoint = useApiEndpoint("snsCheck");

  return useMutation({
    mutationKey: ["signUpSnsCheck", key],
    mutationFn: (data: SignUpSnsCheckRequest) => {
      return $api<SignUpSnsCheckRequest, SignUpSnsCheckResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 휴대폰 번호인증 SMS 발송
export const useApiSignUpPhoneCheckCode = (key: number | string = "") => {
  const endpoint = useApiEndpoint("phoneCheckCode");

  return useMutation({
    mutationKey: ["signUpPhoneCheckCode", key],
    mutationFn: (data: SignUpPhoneCheckCodeRequest) => {
      return $api<SignUpPhoneCheckCodeRequest, SignUpPhoneCheckCodeResponse>(
        endpoint,
        {
          body: {
            data,
          },
        },
      );
    },
  });
};

// CI 연동계정 여부 체크
export const useApiSignUpCiCheck = (key: number | string = "") => {
  const endpoint = useApiEndpoint("ciCheck");

  return useMutation({
    mutationKey: ["signUpCiCheck", key],
    mutationFn: (data: SignUpCiCheckRequest) => {
      return $api<SignUpCiCheckRequest, SignUpCiCheckResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원가입
export const useApiSignUpBasic = (key: number | string = "") => {
  const endpoint = useApiEndpoint("signUp");

  return useMutation({
    mutationKey: ["signUpBasic", key],
    mutationFn: (data: SignUpBasicRequest) => {
      const timestamp = DateTime.now().toMillis();
      const hmac = useHmac(
        `${data.loginId}_${timestamp}`,
        useSigString<SignUpBasicRequest>(data),
      );

      return $api<SignUpBasicRequest, SignUpBasicResponse>(endpoint, {
        body: {
          header: {
            sig: hmac.text,
            requestId: hmac.key,
          },
          data,
        },
      });
    },
  });
};

// SNS 회원가입
export const useApiSignUpSns = (key: number | string = "") => {
  const endpoint = useApiEndpoint("signUpSns");

  return useMutation({
    mutationKey: ["signUpSns", key],
    mutationFn: (data: SignUpSnsRequest) => {
      const timestamp = DateTime.now().toMillis();
      const hmac = useHmac(
        `${data.loginId}_${timestamp}`,
        useSigString<SignUpSnsRequest>(data),
      );

      return $api<SignUpSnsRequest, SignUpSnsResponse>(endpoint, {
        body: {
          header: {
            sig: hmac.text,
            requestId: hmac.key,
          },
          data,
        },
      });
    },
  });
};

// CI값으로 SNS연동
export const useApiSignUpConnectToCi = (key: number | string = "") => {
  const endpoint = useApiEndpoint("connectToCi");

  return useMutation({
    mutationKey: ["signUpConnectToCi", key],
    mutationFn: (data: SignUpConnectToCiRequest) => {
      return $api<SignUpConnectToCiRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원가입 약관 목록 조회
export const useApiSignUpTerms = () => {
  const endpoint = useApiEndpoint("signUpTerms");

  return useQuery({
    queryKey: ["signUpTerms"],
    queryFn: () => {
      return $api<unknown, SignUpTermsResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
  });
};
