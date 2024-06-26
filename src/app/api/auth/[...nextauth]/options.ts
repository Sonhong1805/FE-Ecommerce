import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "204435003902-bcnedst7vpreoonm50eo92f500a7q4cr.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    FacebookProvider({
      clientId: "407854992235589",
      clientSecret: "218dae8a6e075455cd6cc9a1714ebe2b",
    }),
  ],
};
