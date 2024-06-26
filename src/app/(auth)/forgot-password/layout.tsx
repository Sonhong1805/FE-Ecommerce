import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang quên mật khẩu - Mua sắm cùng MONA MEDIA",
  description:
    "Trang quên mật khẩu của chúng tôi hỗ trợ bạn khôi phục mật khẩu một cách nhanh chóng và an toàn. Nhập email để nhận hướng dẫn khôi phục và truy cập lại tài khoản của bạn ngay lập tức!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
