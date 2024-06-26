import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang thanh toán - Mua sắm cùng MONA MEDIA",
  description:
    "Trang thanh toán của chúng tôi cung cấp quy trình thanh toán đơn giản và bảo mật. Hoàn tất thông tin cần thiết để đặt mua sản phẩm nhanh chóng và tiện lợi, đảm bảo trải nghiệm mua sắm tuyệt vời cho bạn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
