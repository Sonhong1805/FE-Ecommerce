import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn hàng yêu thích",
  description:
    "Nơi bạn có thể lưu trữ và quản lý danh sách các sản phẩm yêu thích của mình. Dễ dàng thêm và xóa các sản phẩm để theo dõi và mua lại những món hàng mà bạn quan tâm nhất!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
