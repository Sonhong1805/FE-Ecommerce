import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang đăng nhập - Mua sắm cùng MONA MEDIA",
  description:
    "Trang đăng nhập của chúng tôi mang đến cho bạn cơ hội truy cập vào kho hàng hóa phong phú với giá cả phải chăng. Đăng nhập ngay để trải nghiệm mua sắm tiện lợi và tiết kiệm!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
