import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
  description:
    "Tại đây, bạn có thể xem lại các sản phẩm đã mua, phương thức thanh toán, địa chỉ giao hàng và trạng thái của đơn hàng. Điều này giúp bạn theo dõi và quản lý các đơn hàng một cách dễ dàng và tiện lợi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
