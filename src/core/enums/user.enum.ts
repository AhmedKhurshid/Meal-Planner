export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
  NONE = 'None',
  OTHER = 'I Prefer not to say',
}

export enum ROLE {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  STAFF = 'Staff',

  // USER = 'User',
}

// export enum CITY {
//   KARACHI = 'Karachi',
//   ISLAMABAD = 'Islamabad',
//   LAHORE = 'Lahore',
//   MULTAN = 'Multan',
//   HYDERABAD = 'Hyderabad',
//   PESHAWAR = 'Peshawar',
//   QUETTA = 'Quetta'
// }

// Lawyer Status
export enum STATUS {
  NONE = 'None', // APPONTMENT_CLIENT, LAWYER_CLIENT,
  ACTIVE = 'Active',
  REJECT = 'Reject',
  PENDING = 'Pending', // LAWYER DEFAULT
  BLOCK = 'Block',
  CANCEL = 'Cancel',
}

export enum UPLOAD_PATH {
  DOC = 'docoument',
  IMAGE = 'image',
}

export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum DAYS {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum TIME {
  AM9 = '09:00:00',
  AM10 = '10:00:00',
  AM11 = '11:00:00',
  PM12 = '12:00:00',
  PM1 = '13:00:00',
  PM2 = '14:00:00',
  PM3 = '15:00:00',
  PM4 = '16:00:00',
  PM5 = '17:00:00',
}

export enum VENDORSTATUS {
  PENDING = 'Pending',
  ACTIVE = 'Active',
}

export enum ITEM {
  INACTIVE = 'Inactive',
  ACTIVE = 'Active',
}

export enum PAYMENT {
  SUCCESSFULL = 'Successfull',
  PENDING = 'Pending',
}

export enum PAYMENTMETHOD {
  NONE = 'None',
  FACT = 'FACT',
  FINANCIAL_AID = 'Financial Aid',
  SELF_PAY = 'Self Pay',
  CASH = 'Cash',
}

export enum PAYMENTREQUEST { // APPONTMENT_CLIENT, LAWYER_CLIENT,
  ACCEPT = 'Accept',
  REJECT = 'Reject',
  PENDING = 'Pending', // LAWYER DEFAULT
} 