import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa địa chỉ",
  description:
    "Cho phép bạn cập nhật thông tin chi tiết của địa chỉ giao hàng một cách linh hoạt và thuận tiện. Thay đổi địa chỉ giao hàng một cách nhanh chóng để đảm bảo giao hàng đến đúng địa chỉ mà bạn mong muốn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
