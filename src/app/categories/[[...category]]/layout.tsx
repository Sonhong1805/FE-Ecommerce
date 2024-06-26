import baseURL from "@/constants/baseURL";
import nextURL from "@/constants/nextURL";
import type { Metadata } from "next";

type Props = {
  params: { category: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.category[2] || params.category[1];

  const categories = await fetch(baseURL + `categories/detail?slug=${slug}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return {
    title: categories.objCategory?.name
      ? categories.objCategory?.name + " - Mua sắm cùng MONA MEDIA"
      : "Cửa hàng - Mua sắm cùng MONA MEDIA",
    description:
      "khám phá và mua sắm các sản phẩm từ các danh mục khác nhau. Tại đây, bạn có thể tìm thấy một loạt các sản phẩm đa dạng và chất lượng, từ đó đáp ứng nhu cầu mua sắm của mình một cách đầy đủ và thoải mái.",
    openGraph: {
      title: categories.objCategory?.name
        ? categories.objCategory?.name + " - Mua sắm cùng MONA MEDIA"
        : "Cửa hàng - Mua sắm cùng MONA MEDIA",
      description:
        "khám phá và mua sắm các sản phẩm từ các danh mục khác nhau. Tại đây, bạn có thể tìm thấy một loạt các sản phẩm đa dạng và chất lượng, từ đó đáp ứng nhu cầu mua sắm của mình một cách đầy đủ và thoải mái.",
      type: "website",
      images: [nextURL + "/images/logo.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
