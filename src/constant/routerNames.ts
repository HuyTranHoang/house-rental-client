const ROUTER_NAMES = {
  TEST: '/test',
  RENT_HOUSE: '/tim-thue-phong-tro',
  PROPERTY_DETAIL: '/tim-thue-phong-tro/:id',

  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  REQUEST_RESET_PASSWORD: '/quen-mat-khau',
  RESET_PASSWORD: '/dat-lai-mat-khau',

  CONTACT: '/lien-he',
  ABOUT: '/gioi-thieu',

  PROFILE: '/thong-tin-ca-nhan',
  TRANSACTION_HISTORY: '/thong-tin-ca-nhan/lich-su-giao-dich',
  FAVORITE: '/thong-tin-ca-nhan/bat-dong-san-yeu-thich',
  CHANGE_PASSWORD: '/thong-tin-ca-nhan/doi-mat-khau',

  MEMBERSHIP_FEE: '/phi-thanh-vien',
  TOP_UP: '/nap-tien',
  PAYMENT_SUCCESS: '/thanh-toan-thanh-cong',
  PAYMENT_FAILED: '/thanh-toan-that-bai',
  PROMOTION: '/khuyen-mai',

  MESSAGE: '/tin-nhan',

  SERVER_ERROR: '/loi-server',

  getRentHouseDetail: (id: number | string) => `/tim-thue-phong-tro/${id}`,
};

export default ROUTER_NAMES;