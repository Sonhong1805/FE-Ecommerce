import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang đăng ký - Mua sắm cùng MONA MEDIA",
  description:
    "Trang đăng ký của chúng tôi giúp bạn tạo tài khoản dễ dàng để bắt đầu hành trình mua sắm với nhiều ưu đãi hấp dẫn. Đăng ký ngay để không bỏ lỡ các sản phẩm chất lượng và giá tốt!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
