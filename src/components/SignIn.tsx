"use client";
import { setToken } from "@/helpers/common";
import { loginWithNextAuth } from "@/lib/features/auth/authThunk";
import { handleReload } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa6";

const SignIn = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        const username = session.user.name;
        const email = session.user.email;
        const avatar = session.user.image;

        if (username && email && avatar) {
          const response = await dispatch(
            loginWithNextAuth({ username, email, avatar })
          ).unwrap();
          if (response.status === "success") {
            const token = response?.data.token;
            setToken("token", token, 1);
            setTimeout(() => {
              router.push("/");
              dispatch(handleReload(true));
            }, 1300);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex items-center gap-[1.4rem]">
      <button
        onClick={() => signIn("facebook")}
        className="flex flex-1 justify-center gap-4 items-center bg-[#3a589d] text-white text-[1.4rem] rounded-full py-4 px-[1.6rem]">
        <FaFacebookF className="size-[1.5rem]" />
        <span>Login with Facebook</span>
      </button>
      <button
        onClick={() => signIn("google")}
        className="flex flex-1 justify-center gap-4 items-center bg-[#dd4e31] text-white text-[1.4rem] rounded-full py-4 px-[1.6rem]">
        <FaGooglePlusG className="size-[2rem]" />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SignIn;
