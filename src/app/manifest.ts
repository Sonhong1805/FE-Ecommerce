import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mona Media App",
    short_name: "Mona Media App",
    description:
      "Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 15% tối đa 600k/tháng với thẻ tín dụng MONA.",
    icons: [
      {
        src: "images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    theme_color: "#183544",
    background_color: "#183544",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
  };
}
