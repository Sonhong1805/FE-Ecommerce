type TMethodsPayment = {
  logo: string;
  title: string;
  subtitle: string;
  status?: boolean;
  value: string;
};

export const methodsPayment: TMethodsPayment[] = [
  {
    logo: "/images/payment/method-credit.webp",
    title: "Thẻ tín dụng/Thẻ ghi nợ",
    subtitle: "Thẻ tín dụng/Thẻ ghi nợ",
    status: true,
    value: "credit",
  },
  {
    logo: "/images/payment/method-zalopay.webp",
    title: "Ví ZaloPay",
    subtitle: "Kết nối TK ZaloPay",
    value: "zalopay",
  },
  {
    logo: "/images/payment/method-momo.webp",
    title: "Ví MoMo",
    subtitle: "Kết nối TK MoMo",
    value: "momo",
  },
  {
    logo: "/images/payment/method-napas.webp",
    title: "Thẻ ATM nội địa / Internet Banking",
    subtitle: "Thanh toán qua cổng Napas",
    value: "napas",
  },
  {
    logo: "/images/payment/method-cash.webp",
    title: "Thanh toán khi nhận hàng",
    subtitle: "Thanh toán khi nhận hàng",
    value: "cash",
  },
  {
    logo: "/images/payment/method-installment.webp",
    title: "Trả góp",
    subtitle: "Trả góp",
    value: "installment",
  },
];
