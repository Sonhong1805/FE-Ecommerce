import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chọn phương thức thanh toán",
  description:
    "Cho phép bạn lựa chọn và quản lý các phương thức thanh toán một cách thuận tiện. Tạo và cập nhật thông tin thanh toán để hoàn tất các giao dịch mua sắm một cách dễ dàng và nhanh chóng!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
