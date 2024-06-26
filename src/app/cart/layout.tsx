import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang giỏ hàng - Mua sắm cùng MONA MEDIA",
  description:
    "Trang giỏ hàng của chúng tôi hiển thị các sản phẩm bạn đã chọn, giúp bạn dễ dàng xem lại và chỉnh sửa đơn hàng trước khi thanh toán. Kiểm tra giỏ hàng để đảm bảo bạn không bỏ lỡ bất kỳ món hàng yêu thích nào!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
