import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thay đổi mật khẩu",
  description:
    "Cho phép bạn cập nhật mật khẩu mới một cách an toàn và dễ dàng. Đổi mật khẩu thường xuyên để bảo vệ tài khoản của bạn tốt hơn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
