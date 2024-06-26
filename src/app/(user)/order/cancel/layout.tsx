import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn hàng hủy",
  description:
    "Quản lý và xử lý các yêu cầu hủy đơn hàng một cách dễ dàng để đảm bảo trải nghiệm mua sắm của bạn luôn thoải mái và linh hoạt!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
