"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { getToken } from "@/helpers/common";
import { updateDefaultAddress } from "@/lib/features/user/userSlice";
import {
  changeDefaultAddress,
  fetchAddressDetail,
} from "@/lib/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import Swal from "sweetalert2";

const AddressAccount = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addressItems = useAppSelector((state) => state.user.addressItems);
  const [isShowUpdateDefault, setIsShowUpdateDefault] =
    useState<boolean>(false);
  const [idDefault, setIdDefault] = useState<number>(0);

  const handleChangeDefaultAddress = (id: number) => {
    setIdDefault(id);
  };

  const handleSaveDefaultAddress = async () => {
    if (token) {
      const result = await dispatch(
        changeDefaultAddress({ id: idDefault, token })
      ).unwrap();
      if (result.status === "success") {
        await dispatch(updateDefaultAddress(idDefault));
        Swal.fire({
          title: "Thành công!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsShowUpdateDefault(false);
      }
    }
  };

  const handleEditAddress = async (id: number) => {
    if (token) {
      const result = await dispatch(fetchAddressDetail({ id, token })).unwrap();
      if (result.status === "success") {
        router.push("/account/address/edit");
      }
    }
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <div className="flex justify-between">
              {isShowUpdateDefault ? (
                <h1 className="text-[2.2rem] font-normal leading-[6rem]">
                  Chọn địa chỉ nhận hàng mặc định
                </h1>
              ) : (
                <>
                  <h1 className="text-[2.2rem] font-normal leading-[6rem]">
                    Sổ địa chỉ
                  </h1>
                  {!!addressItems?.length && (
                    <button
                      onClick={() => setIsShowUpdateDefault(true)}
                      className="text-cyan text-[1.4rem]">
                      Chọn địa chỉ nhận hàng mặc định
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="bg-white py-[3rem] px-[4rem]">
              {addressItems?.length ? (
                <div>
                  <table>
                    <thead>
                      <tr className="bg-white2 border-b border-solid border-[#eff0f5]">
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]">
                          Họ tên
                        </th>
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]">
                          Address
                        </th>
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]">
                          Postcode
                        </th>
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]">
                          Phone Number
                        </th>
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]"></th>
                        <th className="text-[1.2rem] text-start text-gray7 font-normal whitespace-nowrap py-[1.2rem] pl-[1rem]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addressItems?.map((item: TUserAddress) => (
                        <tr
                          key={item.id}
                          className="border-b border-solid border-[#eff0f5] hover:bg-white2">
                          <td className="text-[1.2rem] py-[1.2rem] pl-[1rem]">
                            {item.username}
                          </td>
                          <td className="text-[1.2rem] py-[1.2rem] pl-[1rem]">
                            {item.type === "home" && (
                              <span className="text-white text-[0.9rem] rounded-[0.8rem] h-[1.5rem] inline-block leading-[1.5rem] mr-[0.5rem] px-[0.7rem] text-center bg-orange">
                                NHÀ RIÊNG
                              </span>
                            )}
                            {item.type === "office" && (
                              <span className="text-white text-[0.9rem] rounded-[0.8rem] h-[1.5rem] inline-block leading-[1.5rem] mr-[0.5rem] px-[0.7rem] text-center bg-cyan">
                                VĂN PHÒNG
                              </span>
                            )}
                            <span className="">{item.deliveryAddress}</span>
                          </td>
                          <td className="text-[1.2rem] py-[1.2rem] pl-[1rem]">
                            {item.province.name} - {item.district.name} -{" "}
                            {item.ward.name}
                          </td>
                          <td className="text-[1.2rem] py-[1.2rem] pl-[1rem]">
                            {item.phoneNumber}
                          </td>
                          <td className="text-[1.2rem] py-[1.2rem] pl-[1rem]">
                            {item.isDefault && (
                              <p className="text-gray7">
                                DEFAULT BILLING ADDRESS
                              </p>
                            )}
                          </td>
                          <td className="text-[1.2rem] py-[1.2rem] px-[1rem]">
                            {isShowUpdateDefault ? (
                              <input
                                type="radio"
                                name="default"
                                defaultChecked={item.isDefault}
                                className="accent-cyan"
                                onChange={() =>
                                  handleChangeDefaultAddress(item.id)
                                }
                              />
                            ) : (
                              <button
                                onClick={() => handleEditAddress(item.id)}
                                className="text-cyan text-[1.4rem]">
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-[25rem]">
                  <p className="text-[1.6rem] py-[5rem] px-[3rem] text-gray">
                    Save your shipping and billing address here.
                  </p>
                  <div className="px-[3rem]">
                    <SlLocationPin className="text-[4rem] text-gray" />
                  </div>
                </div>
              )}
              <div className="mt-[2.4rem] text-end">
                {isShowUpdateDefault ? (
                  <button
                    onClick={handleSaveDefaultAddress}
                    className="inline-block h-[4rem] min-w-[16.8rem] text-[1.4rem] px-[3.6rem] leading-[4rem] bg-cyan text-white mb-[1.6rem]">
                    LƯU
                  </button>
                ) : (
                  <Link
                    href={"/account/address/create"}
                    className="inline-block h-[4rem] min-w-[16.8rem] text-[1.4rem] px-[3.6rem] leading-[4rem] bg-cyan text-white mb-[1.6rem]">
                    + ADD NEW ADDRESS
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddressAccount;
