import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý tài khoản",
  description:
    "Hiển thị thông tin cá nhân, theo dõi đơn hàng và quản lý cài đặt tài khoản dễ dàng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
