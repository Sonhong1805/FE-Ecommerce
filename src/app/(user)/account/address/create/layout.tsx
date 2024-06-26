import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm địa chỉ",
  description:
    "Giúp bạn thêm mới địa chỉ giao hàng vào sổ địa chỉ của bạn một cách dễ dàng và nhanh chóng. Tạo địa chỉ mới để đảm bảo các giao hàng đến đúng nơi mà bạn mong muốn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
