"use client";
import { accountLinks } from "@/constants/accountLinks";
import baseURL from "@/constants/baseURL";
import isFullUrl from "@/helpers/checkUrl";
import { getToken } from "@/helpers/common";
import { useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

const AccountNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentInfoUser = useAppSelector((state) => state.user.infoUser);

  const { data: session } = useSession();

  const [avatar, setAvatar] = useState<string>("/images/avatar-default.jpg");

  useEffect(() => {
    if (currentInfoUser.avatar) {
      if (isFullUrl(currentInfoUser.avatar)) {
        setAvatar(currentInfoUser.avatar);
      } else {
        setAvatar(`${baseURL}/images/${currentInfoUser.avatar}`);
      }
    } else {
      setAvatar("/images/avatar-default.jpg");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const token = getToken();
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router, token]);

  return (
    <aside className="pt-[1.6rem] w-[15.8rem]">
      <figure className="mb-[1.2rem] size-[5rem] ml-[4rem] rounded-full overflow-hidden">
        <Image
          src={avatar}
          className="object-cover size-full"
          width={50}
          height={50}
          sizes="(max-width: 5rem) 100vw, 5rem"
          alt=""
        />
      </figure>
      <div className="">
        <p className="text-[1.2rem]">
          <span>Xin chào, </span>
          <span>{currentInfoUser?.username}</span>
        </p>
        <div className="bg-green text-white ml-[0.4rem] mt-[0.4rem] inline-flex items-center gap-[0.5rem] py-[0.2rem] px-[1rem] rounded-full">
          <FaCheck className="text-[1.2rem]" />
          <span>Verified Account</span>
        </div>
      </div>
      <ul className="mt-[1.6rem] text-[1.6rem] leading-[2.4rem]">
        {accountLinks.map((link) => (
          <li className="mt-[1.6rem]" key={link.href}>
            <Link
              href={link.href}
              className={`font-bold ${
                pathname === link.href ? "text-cyan" : "text-dark"
              }`}>
              {link.name}
            </Link>
            <ul className="text-[1.4rem] pl-[1.6rem] ">
              {link.children?.map((child) => (
                <li className="" key={child.href}>
                  <Link
                    href={link.href + child.href}
                    className={
                      pathname === link.href + child.href
                        ? "text-cyan"
                        : "text-dark2"
                    }>
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AccountNavbar;
