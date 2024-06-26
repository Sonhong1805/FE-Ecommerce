import baseURL from "@/constants/baseURL";
import getSlugFromURL from "@/helpers/getSlugFromURL";
import type { Metadata } from "next";

type Props = {
  params: { detail: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = params.detail;

  const product = await fetch(
    baseURL + `products/detail?detail=${getSlugFromURL(detail)}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return {
    title: product.objDetail.name + " - Mua sắm cùng MONA MEDIA",
    description: product.objDetail.description,
    openGraph: {
      title: product.objDetail.name,
      description: product.objDetail.description,
      type: "website",
      images: [process.env.NEXTAUTH_URL + product.objDetail.images[0]],
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
