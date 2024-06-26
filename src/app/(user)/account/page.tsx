"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { obfuscateEmail } from "@/helpers/obfuscateEmail";
import { handleOrderedDetail } from "@/lib/features/ordered/orderedSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";

const MyAccount = () => {
  const userLoggedIn = useAppSelector((state) => state.user.userLoggedIn);
  const currentUser = userLoggedIn?.data?.user;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [userAddress, setUserAddress] = useState<TUserAddress | null>(null);

  const addressItems = useAppSelector((state) => state.user.addressItems);

  useEffect(() => {
    const addressDefault = addressItems?.find(
      (address: TUserAddress) => address.isDefault
    );
    setUserAddress(addressDefault);
  }, [addressItems]);

  const orderedItems = useAppSelector((state) => state.ordered.orderedItems);

  const handleReviewOrdered = async (item: TOrdered) => {
    await dispatch(handleOrderedDetail(item));
    router.push("/order/view");
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Quản lý tài khoản
            </h1>
            <div className="flex items-center gap-[1.2rem]">
              <article className="bg-white min-w-[28.8rem] h-[18.2rem] p-[1.6rem] box-content">
                <div className="text-[1.6rem] mb-[1.6rem]">
                  <span>Thông tin cá nhân</span>
                  <span className="text-gray2 text-[1.2rem] mx-[0.4rem]">
                    |
                  </span>
                  <Link
                    href={"/account/profile/edit"}
                    className="text-[1.2rem] text-cyan">
                    Chỉnh sửa
                  </Link>
                </div>
                <div className="text-[1.4rem] mb-[1rem]">
                  {currentUser?.username}
                </div>
                <div className="text-[1.4rem] mb-[1rem]">
                  {currentUser && obfuscateEmail(currentUser.email)}
                </div>
                <div>
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
              </article>
              <article className="bg-white w-full h-[18.2rem] p-[1.6rem] box-content flex">
                <div className="flex-1 pr-[1.6rem]">
                  <div className="text-[1.6rem] mb-[1.6rem]">
                    <span>Sổ địa chỉ</span>
                    <span className="text-gray2 text-[1.2rem] mx-[0.4rem]">
                      |
                    </span>
                    <Link
                      href={"/account/address/create"}
                      className="text-[1.2rem] text-cyan">
                      Thêm
                    </Link>
                  </div>
                  <div className=" text-[1.2rem] my-[1.5rem]">
                    {userAddress ? (
                      <>
                        <p className="text-dark2 text-[1.2rem] mb-[1.5rem]">
                          Địa chỉ nhận hàng mặc định
                        </p>
                        <p className="text-[1.4rem] mb-[1rem] font-bold">
                          {userAddress?.username}
                        </p>
                        <p className="text-[1.2rem] mb-[0.5rem]">
                          {userAddress?.deliveryAddress}
                        </p>
                        <p className="text-[1.2rem] mb-[0.5rem]">
                          {userAddress?.province.name} -{" "}
                          {userAddress?.district.name} -{" "}
                          {userAddress?.ward.name}
                        </p>
                        <p className="text-[1.2rem] mb-[0.5rem]">
                          (+84) {userAddress?.phoneNumber}
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p className="text-dark2">
                          Lưu thông tin địa chỉ giao hàng
                        </p>
                        <div className="py-[3rem]">
                          <SlLocationPin className="text-[4rem]" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-1 pl-[1.6rem] border-l-2 border-solid border-gray6 ">
                  {userAddress ? (
                    <>
                      <p className="text-dark2 text-[1.2rem] mb-[1.5rem] mt-[4rem]">
                        Địa chỉ nhận hàng mặc định
                      </p>
                      <p className="text-[1.4rem] mb-[1rem] font-bold">
                        {userAddress?.username}
                      </p>
                      <p className="text-[1.2rem] mb-[0.5rem]">
                        {userAddress?.deliveryAddress}
                      </p>
                      <p className="text-[1.2rem] mb-[0.5rem]">
                        {userAddress?.province.name} -{" "}
                        {userAddress?.district.name} - {userAddress?.ward.name}
                      </p>
                      <p className="text-[1.2rem] mb-[0.5rem]">
                        (+84) {userAddress?.phoneNumber}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-dark2 text-[1.2rem] mt-[4rem] mb-[1.5rem]">
                        Lưu thông tin địa chỉ thanh toán
                      </p>
                    </>
                  )}
                </div>
              </article>
            </div>
            {!!orderedItems?.length && (
              <article className="bg-white mt-[2rem]">
                <div className="text-[1.6rem] h-[5rem] leading-[5rem] pl-[1.6rem]">
                  Đơn hàng gần đây
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-[1.4rem] py-[1.6rem] px-[2rem] border-b border-solid border-gray6 text-start bg-white3 text-gray">
                          Đơn hàng #
                        </th>
                        <th className="text-[1.4rem] py-[1.6rem] px-[2rem] border-b border-solid border-gray6 text-start bg-white3 text-gray">
                          Ngày đặt hàng
                        </th>
                        <th className="text-[1.4rem] py-[1.6rem] px-[2rem] border-b border-solid border-gray6 text-start bg-white3 text-gray">
                          Sản phẩm
                        </th>
                        <th className="text-[1.4rem] py-[1.6rem] px-[2rem] border-b border-solid border-gray6 text-end bg-white3 text-gray">
                          Tổng cộng
                        </th>
                        <th className="text-[1.4rem] py-[1.6rem] px-[2rem] border-b border-solid border-gray6 text-end bg-white3 text-gray"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderedItems?.map((item: TOrdered) => {
                        const totalPrice = item.items
                          ?.filter((item) => !item.status)
                          ?.reduce((a, b) => (a += b.newPrice), 0);
                        const totalPriceFormatted = new Intl.NumberFormat(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        ).format(totalPrice ? totalPrice + 15000 : 0);
                        return (
                          <tr key={item.id}>
                            <td className="text-[1.4rem] p-[2rem] text-start w-[18.8rem]">
                              {item.id}
                            </td>
                            <td className="text-[1.4rem] p-[2rem] text-start w-[18.8rem]">
                              {item.orderTime}
                            </td>
                            <td className="text-[1.4rem] p-[2rem] text-start w-[28.2rem]">
                              <div className="flex gap-[0.4rem] items-center">
                                {item.items?.map((child) => (
                                  <Image
                                    key={child.id}
                                    src={child.image}
                                    alt=""
                                    width={40}
                                    height={40}
                                    priority
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="text-[1.4rem] p-[2rem] text-end w-[18.8rem]">
                              {totalPriceFormatted}
                            </td>
                            <td className="text-[1.4rem] p-[2rem] text-end">
                              <button
                                className="text-[1.4rem] text-cyan"
                                onClick={() => handleReviewOrdered(item)}>
                                QUẢN LÝ
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </article>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccount;
