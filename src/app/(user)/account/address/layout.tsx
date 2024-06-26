import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sổ địa chỉ",
  description:
    "Nơi bạn có thể lưu trữ và quản lý các địa chỉ giao hàng một cách tiện lợi. Thêm, sửa đổi hoặc xóa các địa chỉ để tối ưu hóa quá trình mua sắm và giao nhận hàng hóa!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
