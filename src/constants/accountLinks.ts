type TAccountLinks = {
  name: string;
  href: string;
  children?: {
    name: string;
    href: string;
  }[];
};

export const accountLinks: TAccountLinks[] = [
  {
    name: "Quản lý tài khoản",
    href: "/account",
    children: [
      {
        name: "Thông tin cá nhân",
        href: "/profile",
      },
      {
        name: "Sổ địa chỉ",
        href: "/address",
      },
      {
        name: "Tùy chọn thanh toán",
        href: "/payment",
      },
    ],
  },
  {
    name: "Đơn hàng của tôi",
    href: "/order",
    children: [
      {
        name: "Đơn hàng đổi trả",
        href: "/return",
      },
      {
        name: "Đơn hàng hủy",
        href: "/cancel",
      },
    ],
  },
  {
    name: "Nhận xét của tôi",
    href: "/review",
  },
  {
    name: "Sản phẩm yêu thích",
    href: "/favourite",
  },
];
