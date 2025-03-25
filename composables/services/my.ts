import { useQuery, useMutation } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import type {
  MyProfileResponse,
  MyProfileEditRequest,
  MyProfileEditResponse,
  MyRenameRequest,
  MyNewPasswordRequest,
  MySnsLinkRequest,
  MyDeleteAccountInfoResponse,
  MyDeleteAccountRequest,
  MySnsListResponse,
  MyCarEditRequest,
  MyCarListResponse,
  MyPasswordStateResponse,
  MyChargeInfoRequest,
  MyChargeInfoResponse,
  MyPointInfoResponse,
  MyAgreeEditRequest,
  MyEncodeCustomerKeyResponse,
  MyAgreeEditResponse,
} from "@/types/api";

// 회원 정보 조회
export const useApiMyProfile = (enabled: boolean = true) => {
  const endpoint = useApiEndpoint("myProfile");

  return useQuery({
    queryKey: ["myProfile"],
    queryFn: () => {
      return $api<unknown, MyProfileResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    enabled,
    staleTime: 0,
  });
};

// 회원 정보 수정
export const useApiMyProfileEdit = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myProfileEdit");

  return useMutation({
    mutationKey: ["myProfileEdit", key],
    mutationFn: ({
      loginId,
      data,
    }: {
      loginId: string;
      data: MyProfileEditRequest;
    }) => {
      const timestamp = DateTime.now().toMillis();
      const hmac = useHmac(
        `${loginId}_${timestamp}`,
        useSigString<MyProfileEditRequest>(data),
      );

      return $api<MyProfileEditRequest, MyProfileEditResponse>(endpoint, {
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

// 회원명 변경
export const useApiMyRename = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myRename");

  return useMutation({
    mutationKey: ["myRename", key],
    mutationFn: (data: MyRenameRequest) => {
      return $api<MyRenameRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 비밀번호 변경
export const useApiMyNewPassword = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myNewPassword");

  return useMutation({
    mutationKey: ["myNewPassword", key],
    mutationFn: (data: MyNewPasswordRequest) => {
      return $api<MyNewPasswordRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// SNS 연결 설정
export const useApiMySnsLink = (key: number | string = "") => {
  const endpoint = useApiEndpoint("mySnsLink");

  return useMutation({
    mutationKey: ["mySnsLink", key],
    mutationFn: (data: MySnsLinkRequest) => {
      return $api<MySnsLinkRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원 탈퇴 정보 조회
export const useApiMyDeleteAccountInfo = () => {
  const endpoint = useApiEndpoint("myDeleteAccountInfo");

  return useQuery({
    queryKey: ["myDeleteAccountInfo"],
    queryFn: () => {
      return $api<unknown, MyDeleteAccountInfoResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    staleTime: 0,
  });
};

// 회원 탈퇴
export const useApiMyDeleteAccount = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myDeleteAccount");

  return useMutation({
    mutationKey: ["myDeleteAccount", key],
    mutationFn: (data: MyDeleteAccountRequest) => {
      return $api<MyDeleteAccountRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원 SNS 연결정보 목록
export const useApiMySnsList = () => {
  const endpoint = useApiEndpoint("mySnsList");

  return useQuery({
    queryKey: ["mySnsList"],
    queryFn: () => {
      return $api<unknown, MySnsListResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    staleTime: 0,
  });
};

// 차량 등록, 수정, 삭제
export const useApiMyCarEdit = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myCarEdit");

  return useMutation({
    mutationKey: ["myCarEdit", key],
    mutationFn: (data: MyCarEditRequest) => {
      return $api<MyCarEditRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 내 차량목록 조회
export const useApiMyCarList = () => {
  const endpoint = useApiEndpoint("myCarList");

  return useQuery({
    queryKey: ["myCarList"],
    queryFn: () => {
      return $api<unknown, MyCarListResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    staleTime: 0,
  });
};

// 회원 비밀번호 유무 체크
export const useApiMyPasswordState = () => {
  const endpoint = useApiEndpoint("myPasswordState");

  return useQuery({
    queryKey: ["myPasswordState"],
    queryFn: () => {
      return $api<unknown, MyPasswordStateResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    enabled: false,
    staleTime: 0,
  });
};

// 주유 이벤트 정보
export const useApiMyChargeInfo = (data: MyChargeInfoRequest) => {
  const endpoint = useApiEndpoint("chargeInfo");

  return useQuery({
    queryKey: ["chargeInfo"],
    queryFn: () => {
      return $api<MyChargeInfoRequest, MyChargeInfoResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
    staleTime: 0,
  });
};

// 회원 포인트 정보 조회
export const useApiMyPointInfo = () => {
  const endpoint = useApiEndpoint("pointInfo");

  return useQuery({
    queryKey: ["pointInfo"],
    queryFn: () => {
      return $api<unknown, MyPointInfoResponse>(endpoint, {
        body: {},
      });
    },
    staleTime: 0,
  });
};

// 설정 정보 저장
export const useApiMyAgreeEdit = (key: number | string = "") => {
  const endpoint = useApiEndpoint("agreeEdit");

  return useMutation({
    mutationKey: ["agreeEdit", key],
    mutationFn: (data: MyAgreeEditRequest) => {
      return $api<MyAgreeEditRequest, MyAgreeEditResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 티티톡 정보 암호화 처리
export const useApiMyEncodeCustomerKey = (key: number | string = "") => {
  const endpoint = useApiEndpoint("myEncodeCustomerKey");

  return useMutation({
    mutationKey: ["myEncodeCustomerKey", key],
    mutationFn: (data: unknown = {}) => {
      return $api<unknown, MyEncodeCustomerKeyResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
