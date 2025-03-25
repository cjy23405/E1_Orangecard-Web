// API Endpoint
export class ApiEndpoint {
  apiNo!: string;
  path!: string;
  useAuthorization?: boolean = true; // accessToken 사용 여부
  useCorpTaxiAuthorization?: boolean = false; // 법인 택시 accessToken 사용 여부
  useMockup?: boolean = false; // 목업 사용 여부 (from. Local Route)
}

// API Endpoints
export const endpoints: { [index: string]: ApiEndpoint } = {
  // 토큰 갱신
  token: {
    apiNo: "TOKEN_001",
    path: "/token/v1/generateToken",
    useAuthorization: false,
  },
  // 로그인
  login: {
    apiNo: "B2C_NAU_001",
    path: "/nau/v1/login",
    useAuthorization: false,
  },
  // SNS 로그인
  snsLogin: {
    apiNo: "B2C_NAU_002",
    path: "/nau/v1/snsLogin",
    useAuthorization: false,
  },
  // 회원가입 (sig 필요)
  signUp: {
    apiNo: "B2C_NAU_003",
    path: "/nau/v1/cxJoinUser",
    useAuthorization: false,
  },
  // SNS 회원가입 (sig 필요)
  signUpSns: {
    apiNo: "B2C_NAU_004",
    path: "/nau/v1/cxSnsJoinUser",
    useAuthorization: false,
  },
  // 아이디 찾기(CI)
  forgotId: {
    apiNo: "B2C_NAU_005",
    path: "/nau/v1/getLoginIdByCi",
    useAuthorization: false,
  },
  // 비밀번호 변경(CI)
  forgotPw: {
    apiNo: "B2C_NAU_006",
    path: "/nau/v1/modLoginPwByCi",
    useAuthorization: false,
  },
  // 로그아웃
  logout: {
    apiNo: "B2C_NAU_007",
    path: "/nau/v1/logout",
    useAuthorization: false,
  },
  // 로그인 아이디 중복체크
  idCheck: {
    apiNo: "B2C_NAU_008",
    path: "/nau/v1/loginIdDupChk",
    useAuthorization: false,
  },
  // SNS 로그인 등록여부 체크
  snsCheck: {
    apiNo: "B2C_NAU_009",
    path: "/nau/v1/snsRegChk",
    useAuthorization: false,
  },
  // 주소찾기
  addressSearch: {
    apiNo: "B2C_NAU_011",
    path: "/nau/v1/getAddrLink",
    useAuthorization: false,
  },
  // 약관 상세 목록 조회
  agreementList: {
    apiNo: "B2C_NAU_012",
    path: "/nau/v1/getTermsDtlList",
    useAuthorization: false,
  },
  // 약관 상세 조회(단건)
  agreementDetail: {
    apiNo: "B2C_NAU_013",
    path: "/nau/v1/getTermsDtlInfo",
    useAuthorization: false,
  },
  // FAQ 목록 조회
  faqList: {
    apiNo: "B2C_NAU_014",
    path: "/nau/v1/getFaqList",
    useAuthorization: false,
  },
  // 공지사항 목록 조회
  noticeList: {
    apiNo: "B2C_NAU_015",
    path: "/nau/v1/getNoticeList",
    useAuthorization: false,
  },
  // 공지사항 상세 조회
  noticeDetail: {
    apiNo: "B2C_NAU_016",
    path: "/nau/v1/getNoticeInfo",
    useAuthorization: false,
  },
  // 차량 조회
  carSearch: {
    apiNo: "B2C_NAU_017",
    path: "/nau/v1/getCarInfo",
    useAuthorization: false,
  },
  // 이벤트 목록 조회
  eventList: {
    apiNo: "B2C_NAU_018",
    path: "/nau/v1/getEventList",
    useAuthorization: false,
  },
  // 이벤트 상세 조회
  eventDetail: {
    apiNo: "B2C_NAU_019",
    path: "/nau/v1/getEventInfo",
    useAuthorization: false,
  },
  // 제휴 카드 조회
  associationCardList: {
    apiNo: "B2C_NAU_020",
    path: "/nau/v1/getPartnerCardList",
    useAuthorization: false,
  },
  // 휴대폰 번호인증 SMS 발송
  phoneCheckCode: {
    apiNo: "B2C_NAU_021",
    path: "/nau/v1/confirmCellPhoneBySms",
    useAuthorization: false,
  },
  // CI 연동계정 여부 체크
  ciCheck: {
    apiNo: "B2C_NAU_022",
    path: "/nau/v1/getUserChkByCi",
    useAuthorization: false,
  },
  // CI값으로 SNS연동
  connectToCi: {
    apiNo: "B2C_NAU_023",
    path: "/nau/v1/snsLinkByCi",
    useAuthorization: false,
  },
  // 회원가입 약관 목록 조회
  signUpTerms: {
    apiNo: "B2C_NAU_024",
    path: "/nau/v1/getJoinTermList",
    useAuthorization: false,
  },
  // 이벤트 당첨자 목록 조회
  eventAnnouncementList: {
    apiNo: "B2C_NAU_025",
    path: "/nau/v1/getEventWinnerList",
    useAuthorization: false,
  },
  // 이벤트 당첨자 상세 조회
  eventAnnouncementDetail: {
    apiNo: "B2C_NAU_026",
    path: "/nau/v1/getEventWinnerInfo",
    useAuthorization: false,
  },
  // FAQ 카테고리 목록 조회
  faqCategoryList: {
    apiNo: "B2C_NAU_027",
    path: "/nau/v1/getFaqTypeList",
    useAuthorization: false,
  },
  // 제휴 카테고리 목록 조회
  associationCategoryList: {
    apiNo: "B2C_NAU_028",
    path: "/nau/v1/getPartnershipCategoryList",
    useAuthorization: false,
  },
  // 제휴 서비스 목록 조회
  associationServiceList: {
    apiNo: "B2C_NAU_029",
    path: "/nau/v1/getPartnershipServiceList",
    useAuthorization: false,
  },
  // 티티 월페이퍼 조회
  wallpaperList: {
    apiNo: "B2C_NAU_030",
    path: "/nau/v1/getWallpaperList",
    useAuthorization: false,
  },
  // 티티 월페이퍼 다운로드 횟수 증가
  wallpaperDownloadCount: {
    apiNo: "B2C_NAU_031",
    path: "/nau/v1/increaseWallpaperDownload",
    useAuthorization: false,
  },
  // 팝업 컨텐츠 목록 조회
  popupList: {
    apiNo: "B2C_NAU_033",
    path: "/nau/v1/getPopupContentList",
    useAuthorization: false,
  },
  // 공통코드 조회
  codeList: {
    apiNo: "B2C_NAU_034",
    path: "/nau/v1/getCommCodeList",
    useAuthorization: false,
  },
  // 제휴 서비스 상세 조회
  associationServiceDetail: {
    apiNo: "B2C_NAU_035",
    path: "/nau/v1/getPartnershipServiceInfo",
    useAuthorization: false,
  },
  // 캡차정보조회
  captchaCode: {
    apiNo: "B2C_NAU_036",
    path: "/nau/v1/getCaptchaInfo",
    useAuthorization: false,
  },
  // 법인 회원 로그인
  corpTaxiLogin: {
    apiNo: "B2C_NAU_037",
    path: "/nau/v1/corporateLogin",
    useAuthorization: false,
  },
  // 로그인 실패 횟수 조회
  loginFailCount: {
    apiNo: "B2C_NAU_038",
    path: "/nau/v1/getLoginFailCnt",
    useAuthorization: false,
  },
  // 설문조사 상태 조회
  surveyCheck: {
    apiNo: "B2C_NAU_039",
    path: "/nau/v1/getSurveyStatusInfo",
    useAuthorization: false,
  },
  // 설문조사 상세 조회
  surveyQuestion: {
    apiNo: "B2C_NAU_040",
    path: "/nau/v1/getSurveyInfo",
    useAuthorization: false,
  },
  // 설문조사 답변 저장
  surveyAnswer: {
    apiNo: "B2C_NAU_041",
    path: "/nau/v1/addSurveyAnswer",
    useAuthorization: false,
  },
  // PermaLink 캠페인 참여
  entryPermaLinkCampaign: {
    apiNo: "B2C_NAU_043",
    path: "/nau/v1/addPermaLinkCampaign",
    useAuthorization: false,
  },
  // 1:1 문의 등록
  contactAdd: {
    apiNo: "B2C_VOC_001",
    path: "/voc/v1/addQna",
  },
  // 1:1 문의 목록 조회
  contactList: {
    apiNo: "B2C_VOC_002",
    path: "/voc/v1/getQnaList",
  },
  // 회원 정보 조회
  myProfile: {
    apiNo: "B2C_MBR_001",
    path: "/mbr/v1/getMbrInfo",
  },
  // 비밀번호 변경
  myNewPassword: {
    apiNo: "B2C_MBR_002",
    path: "/mbr/v1/modLoginPw",
  },
  // 회원 정보 수정 (sig 필요)
  myProfileEdit: {
    apiNo: "B2C_MBR_004",
    path: "/mbr/v1/modMbrInfo",
  },
  // 회원명 변경
  myRename: {
    apiNo: "B2C_MBR_005",
    path: "/mbr/v1/modMbrName",
  },
  // SNS 연결 설정
  mySnsLink: {
    apiNo: "B2C_MBR_006",
    path: "/mbr/v1/cxSnsLink",
  },
  // 회원 탈퇴 정보 조회
  myDeleteAccountInfo: {
    apiNo: "B2C_MBR_007",
    path: "/mbr/v1/getWithdrawalMbrInfo",
  },
  // 회원 탈퇴
  myDeleteAccount: {
    apiNo: "B2C_MBR_008",
    path: "/mbr/v1/withdrawMbr",
  },
  // 회원 SNS 연결정보 목록
  mySnsList: {
    apiNo: "B2C_MBR_009",
    path: "/mbr/v1/getMbrSnsLinkList",
  },
  // 회원 보유 카드 목록
  cardList: {
    apiNo: "B2C_MBR_010",
    path: "/mbr/v1/getCardList",
  },
  // 회원 카드 비밀번호 변경
  cardResetPassword: {
    apiNo: "B2C_MBR_011",
    path: "/mbr/v1/modCardPw",
  },
  // 회원 카드 등록 (sig 필요)
  cardAdd: {
    apiNo: "B2C_MBR_012",
    path: "/mbr/v1/addCard",
  },
  // 회원 카드 분실 신고
  cardLost: {
    apiNo: "B2C_MBR_013",
    path: "/mbr/v1/cardLost",
  },
  // 회원 비밀번호 유효성 체크
  checkPassword: {
    apiNo: "B2C_MBR_015",
    path: "/mbr/v1/mbrPwValidChk",
  },
  // 차량 등록, 수정, 삭제
  myCarEdit: {
    apiNo: "B2C_MBR_018",
    path: "/mbr/v1/cxCarInfo",
  },
  // 차량목록 조회
  myCarList: {
    apiNo: "B2C_MBR_020",
    path: "/mbr/v1/getCarList",
  },
  // 충전 내역 조회
  chargeHistoryList: {
    apiNo: "B2C_MBR_021",
    path: "/mbr/v1/getChargingHistoryInfo",
  },
  // 대표카드 설정
  cardRep: {
    apiNo: "B2C_MBR_023",
    path: "/mbr/v1/setMainCard",
  },
  // 회원 비밀번호 유무 체크
  myPasswordState: {
    apiNo: "B2C_MBR_024",
    path: "/mbr/v1/getMbrPwExists",
  },
  // 회원카드 비밀번호 유무 체크
  cardCheckPassword: {
    apiNo: "B2C_MBR_025",
    path: "/mbr/v1/getMbrCardPwExists",
  },
  // 티티톡 정보 암호화 처리
  myEncodeCustomerKey: {
    apiNo: "B2C_MBR_032",
    path: "/mbr/v1/encTitiTalkInfo",
  },
  // 회원 포인트 정보 조회
  pointInfo: {
    apiNo: "B2C_PNT_001",
    path: "/pnt/v1/getPntInfo",
  },
  // 포인트 이용 내역 조회
  pointHistoryList: {
    apiNo: "B2C_PNT_002",
    path: "/pnt/v1/getPntUsageInfo",
  },
  // 법인 택시 포인트 이용 내역 조회
  corpTaxiPointHistoryList: {
    apiNo: "B2C_PNT_002",
    path: "/pnt/v1/getPntUsageInfo",
    useCorpTaxiAuthorization: true,
  },
  // 충전소 목록 조회
  chargeStationList: {
    apiNo: "B2C_PNT_003",
    path: "/pnt/v1/getChargingPntStnList",
  },
  // 충전소별 포인트 내역 조회
  stationPointHistoryList: {
    apiNo: "B2C_PNT_004",
    path: "/pnt/v1/getChargingPntUsageInfo",
  },
  // 주유 이벤트 정보
  chargeInfo: {
    apiNo: "B2C_EVT_015",
    path: "/evt/v1/getRefuelEvntList",
  },
  // PermaLink 이벤트 참여
  entryPermaLinkEvent: {
    apiNo: "B2C_EVT_017",
    path: "/evt/v1/addPermaLinkEvent",
  },
  // 설정 정보 저장
  agreeEdit: {
    apiNo: "B2C_SET_002",
    path: "/set/v1/modAppSet",
  },
};

// get endpoint
export const getEndpoint = (key: string) => {
  const endpoint: ApiEndpoint | null = endpoints[key] || null;
  return endpoint;
};
