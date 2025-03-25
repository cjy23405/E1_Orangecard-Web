import { useQuery, useMutation } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import type {
  CardListRequest,
  CardListResponse,
  CardResetPasswordRequest,
  CardAddRequest,
  CardLostRequest,
  CardRepRequest,
  CardCheckPasswordResponse,
} from "@/types/api";

// 회원 보유 카드 목록
export const useApiCardList = (
  key: number | string = "",
  data: CardListRequest,
) => {
  const endpoint = useApiEndpoint("cardList");

  return useQuery({
    queryKey: ["cardList", key],
    queryFn: () => {
      return $api<CardListRequest, CardListResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
    staleTime: 0,
  });
};

// 회원 카드 비밀번호 변경
export const useApiCardResetPassword = (key: number | string = "") => {
  const endpoint = useApiEndpoint("cardResetPassword");

  return useMutation({
    mutationKey: ["cardResetPassword", key],
    mutationFn: (data: CardResetPasswordRequest) => {
      return $api<CardResetPasswordRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원 카드 등록
export const useApiCardAdd = (key: number | string = "") => {
  const endpoint = useApiEndpoint("cardAdd");

  return useMutation({
    mutationKey: ["cardAdd", key],
    mutationFn: (data: CardAddRequest) => {
      const timestamp = DateTime.now().toMillis();
      const hmac = useHmac(
        `${data.cardNum}_${timestamp}`,
        useSigString<CardAddRequest>(data),
      );

      return $api<CardAddRequest>(endpoint, {
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

// 회원 카드 분실 신고
export const useApiCardLost = (key: number | string = "") => {
  const endpoint = useApiEndpoint("cardLost");

  return useMutation({
    mutationKey: ["cardLost", key],
    mutationFn: (data: CardLostRequest) => {
      return $api<CardLostRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 대표카드 설정
export const useApiCardRep = (key: number | string = "") => {
  const endpoint = useApiEndpoint("cardRep");

  return useMutation({
    mutationKey: ["cardRep", key],
    mutationFn: (data: CardRepRequest) => {
      return $api<CardRepRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 회원카드 비밀번호 유무 체크
export const useApiCardCheckPassword = () => {
  const endpoint = useApiEndpoint("cardCheckPassword");

  return useQuery({
    queryKey: ["cardCheckPassword"],
    queryFn: () => {
      return $api<unknown, CardCheckPasswordResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    staleTime: 0,
  });
};
