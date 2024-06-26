type TProvince = {
  id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
  isDeleted: boolean;
};

type TDistrict = TProvince & {
  path: string;
  path_with_type: string;
  parent_code: string;
};

type TWard = TDistrict;

type TUserAddress = {
  id: number;
  username: string;
  phoneNumber: string;
  deliveryAddress: string;
  province: {
    name: string;
    code: string;
  };
  district: {
    name: string;
    code: string;
  };
  ward: {
    name: string;
    code: string;
  };
  type: string;
  isDefault?: boolean;
};
