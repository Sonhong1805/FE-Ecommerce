import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/product/*",
        "/categories/*",
        "/login/",
        "/signup/",
        "/forgot-password/",
      ],
      disallow: [
        "/account/",
        "/account/*",
        "/cancellations/",
        "/favourite/",
        "/order/",
        "/order/*",
        "/review/",
        "/payment/",
        "/cart/",
      ],
    },
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
  };
}
