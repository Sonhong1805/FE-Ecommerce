import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin cá nhân",
  description:
    "Cho phép bạn cập nhật và quản lý chi tiết cá nhân một cách dễ dàng và an toàn. Đảm bảo thông tin luôn chính xác để nhận được những ưu đãi và dịch vụ tốt nhất!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
