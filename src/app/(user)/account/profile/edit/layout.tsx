import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chỉnh sửa thông tin",
  description:
    "Trang chỉnh sửa thông tin cá nhân của chúng tôi giúp bạn cập nhật và thay đổi chi tiết cá nhân nhanh chóng và an toàn. Điều chỉnh thông tin để đảm bảo hồ sơ của bạn luôn chính xác và đầy đủ!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
