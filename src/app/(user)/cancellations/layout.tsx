import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lý do huỷ đơn",
  description:
    "Cung cấp một danh sách các lựa chọn lý do phổ biến để bạn chọn khi muốn hủy đơn hàng. Việc này giúp cải thiện quy trình hủy đơn bằng cách cung cấp thông tin cần thiết cho nhà cung cấp và đảm bảo sự linh hoạt và hiệu quả trong việc xử lý yêu cầu hủy đơn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
