type TUSer = {
  username?: string;
  email?: string;
  password?: string;
};

type TInfoUser = TUSer & {
  avatar?: string;
  gender?: string;
  dateOfBirth?: {
    day?: string;
    month?: string;
    year?: string;
  };
  phoneNumber?: string;
  taxCode?: string;
};
