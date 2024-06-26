"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { obfuscateEmail } from "@/helpers/obfuscateEmail";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React from "react";

const ProfileAccount = () => {
  const currentInfoUser = useAppSelector((state) => state.user.infoUser);

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Thông tin cá nhân
            </h1>
            <div className="bg-white p-[4rem]">
              <div className="grid grid-cols-3">
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Họ tên</h3>
                  <p className="text-[1.4rem] pt-[0.7rem]">
                    {currentInfoUser?.username}
                  </p>
                </div>
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Địa chỉ email</h3>
                  <p className="text-[1.4rem] pt-[0.7rem]">
                    {currentInfoUser?.email &&
                      obfuscateEmail(currentInfoUser.email)}
                  </p>
                  <div className="flex items-center mt-[1rem]">
                    <input
                      type="checkbox"
                      name="email-offers"
                      id="email-offers"
                      className="size-[1.6rem] accent-secondary"
                    />
                    <label
                      htmlFor="email-offers"
                      className="text-[1.2rem] mx-[0.5rem]">
                      Nhận thông tin ưu đãi qua email
                    </label>
                  </div>
                </div>
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Số điên thoại</h3>
                  {currentInfoUser?.phoneNumber ? (
                    <>
                      <p className="text-[1.4rem] pt-[0.7rem]">
                        +84 {currentInfoUser.phoneNumber}
                      </p>
                      <div className="flex items-center mt-[1rem]">
                        <input
                          type="checkbox"
                          name="sms-offers"
                          id="sms-offers"
                          className="size-[1.6rem] accent-secondary"
                        />
                        <label
                          htmlFor="sms-offers"
                          className="text-[1.2rem] mx-[0.5rem]">
                          Nhận thông tin ưu đãi qua SMS
                        </label>
                      </div>
                    </>
                  ) : (
                    <p className="text-[1.4rem] text-gray">
                      Vui lòng nhập số điện thoại của bạn
                    </p>
                  )}
                </div>
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Ngày sinh</h3>
                  {currentInfoUser?.dateOfBirth?.day &&
                  currentInfoUser.dateOfBirth?.month &&
                  currentInfoUser.dateOfBirth?.year ? (
                    <p className="text-[1.4rem] pt-[0.7rem]">
                      {currentInfoUser.dateOfBirth?.year}-
                      {currentInfoUser.dateOfBirth?.month}-
                      {currentInfoUser.dateOfBirth?.day}
                    </p>
                  ) : (
                    <p className="text-[1.4rem] pt-[0.7rem] text-gray">
                      Vui lòng nhập sinh nhật của bạn
                    </p>
                  )}
                </div>
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Giới tính</h3>
                  {currentInfoUser?.gender ? (
                    <p className="text-[1.4rem] pt-[0.7rem]">
                      {currentInfoUser.gender}
                    </p>
                  ) : (
                    <p className="text-[1.4rem] pt-[0.7rem] text-gray">
                      Nhập giới tính của bạn
                    </p>
                  )}
                </div>
                <div className="min-h-[11rem]">
                  <h3 className="text-[1.2rem] mb-[1rem]">Mã số thuế</h3>
                  {currentInfoUser?.taxCode ? (
                    <p className="text-[1.4rem] pt-[0.7rem]">
                      {currentInfoUser.taxCode}
                    </p>
                  ) : (
                    <p className="text-[1.4rem] pt-[0.7rem] text-gray">
                      Nhập mã số thuế của bạn
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-[8rem] w-[28.8rem]">
                <Link
                  href={"/account/profile/edit"}
                  className="h-[4.8rem] block text-center w-full text-[1.4rem] px-[3.6rem] leading-[4.6rem] bg-cyan text-white mb-[1.6rem]">
                  SỬA THÔNG TIN
                </Link>
                <Link
                  href={"/account/profile/changePassword"}
                  className="h-[4.8rem] block text-center w-full text-[1.4rem] px-[3.6rem] leading-[4.6rem] bg-cyan text-white mb-[1.6rem]">
                  ĐẶT MẬT KHẨU
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfileAccount;
