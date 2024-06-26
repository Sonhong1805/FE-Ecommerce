import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn hàng đổi trả",
  description:
    "Nơi bạn có thể yêu cầu và quản lý các yêu cầu đổi trả hàng hóa. Tại đây, bạn có thể thực hiện các bước cần thiết để hoàn trả sản phẩm và nhận được sự hỗ trợ trong quá trình này.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
