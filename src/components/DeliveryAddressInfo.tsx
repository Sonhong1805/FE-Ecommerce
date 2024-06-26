"use client";
import { getToken } from "@/helpers/common";
import { updateDefaultAddress } from "@/lib/features/user/userSlice";
import { changeDefaultAddress } from "@/lib/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import AddressForm from "./AddressForm";

type TDeliveryAddressInfoProps = {
  addressDefault: TUserAddress;
};

const DeliveryAddressInfo = ({ addressDefault }: TDeliveryAddressInfoProps) => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const [isShowUserAddress, setIsShowUserAddress] = useState<boolean>(false);
  const [isShowAddressForm, setIsShowAddressForm] = useState<boolean>(false);

  const addressItems = useAppSelector((state) => state.user.addressItems);

  const chooseAddressRef = useRef<HTMLDivElement | null>(null);
  const addressFormRef = useRef<HTMLDivElement | null>(null);

  const [idDefault, setIdDefault] = useState<number>(0);

  useEffect(() => {
    const handleShowMethods = (event: MouseEvent) => {
      if (
        isShowUserAddress &&
        chooseAddressRef.current &&
        !chooseAddressRef.current.contains(event.target as Node)
      ) {
        setIsShowUserAddress(false);
      }
    };
    document.addEventListener("click", handleShowMethods);

    return () => document.removeEventListener("click", handleShowMethods);
  }, [isShowUserAddress]);

  useEffect(() => {
    const handleShowMethods = (event: MouseEvent) => {
      if (
        !isShowAddressForm &&
        addressFormRef.current &&
        !addressFormRef.current.contains(event.target as Node)
      ) {
        setIsShowAddressForm(false);
      }
    };
    document.addEventListener("click", handleShowMethods);

    return () => document.removeEventListener("click", handleShowMethods);
  }, [isShowAddressForm]);

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
        setIsShowUserAddress(false);
      }
    }
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between bg-gray2 px-[1rem] mt-[1.2rem]">
          <p className="text-[1.4rem] py-[1rem]">Địa chỉ giao hàng</p>
          <button
            onClick={() => setIsShowUserAddress(true)}
            className="text-[1.4rem] text-cyan">
            Chỉnh sửa
          </button>
        </div>
        <div className="bg-white p-[1.2rem]">
          <div className="mb-[1.2rem]">
            <span className="text-[1.4rem] mr-[1.8rem]">
              {addressDefault?.username}
            </span>
            <span className="text-[1.4rem]">{addressDefault?.phoneNumber}</span>
          </div>
          <div className="mb-[1.2rem]">
            {addressDefault?.type === "office" && (
              <span className="bg-cyan text-white font-bold rounded-full py-[0.2rem] px-[1.3rem] text-[1.2rem] mr-[1rem]">
                VĂN PHÒNG
              </span>
            )}
            {addressDefault?.type === "home" && (
              <span className="bg-orange text-white font-bold rounded-full py-[0.2rem] px-[1.3rem] text-[1.2rem] mr-[1rem]">
                NHÀ RIÊNG
              </span>
            )}
            <span className="text-[1.4rem]">
              {addressDefault?.deliveryAddress}, {addressDefault?.ward.name},{" "}
              {addressDefault?.district.name}, {addressDefault?.province.name}
            </span>
          </div>
        </div>
        <div
          className={`overlay ${
            isShowUserAddress || isShowAddressForm
              ? "opacity-visible"
              : "opacity-invisible"
          }`}></div>
        <div
          ref={chooseAddressRef}
          className={`fixed top-0 right-0 bottom-0 z-[9999] translate-transition bg-white w-[50rem] h-screen p-[3rem] overflow-auto ${
            isShowUserAddress ? "" : "translate-x-full"
          }`}>
          <div className="h-[2.8rem] leading-[2.8rem] mb-[3rem] flex justify-between items-center">
            <div className="text-[1.8rem]">Địa chỉ nhận hàng</div>
            <button
              onClick={() => {
                setIsShowAddressForm(true);
                setIsShowUserAddress(false);
              }}
              className="text-cyan text-[1.4rem]">
              Thêm địa chỉ mới
            </button>
          </div>
          <div>
            {addressItems.map((item: TUserAddress) => (
              <div
                key={item.id}
                className="flex p-[1.2rem] mb-[1.2rem] rounded-[0.4rem] border border-solid border-gray8">
                <div className="mr-[1.2rem]">
                  <input
                    type="radio"
                    name="address"
                    className="accent-cyan size-[1.6rem]"
                    defaultChecked={item.isDefault}
                    onChange={() => setIdDefault(item.id)}
                  />
                </div>
                <div>
                  <div className="mb-[0.6rem]">
                    <span className="text-[1.6rem] leading-[1.9rem]">
                      {item.username}
                    </span>
                    <span className="text-[1.6rem] leading-[1.9rem] ml-[1.2rem]">
                      {item.phoneNumber}
                    </span>
                  </div>
                  <div>
                    {item.type === "home" && (
                      <span className="bg-orange rounded-[0.8rem] text-white text-[0.9rem] inline-block h-[1.5rem] text-center mr-[0.5rem] leading-[1.5rem] px-[0.7rem]">
                        NHÀ RIÊNG
                      </span>
                    )}
                    {item.type === "office" && (
                      <span className="bg-cyan rounded-[0.8rem] text-white text-[0.9rem] inline-block h-[1.5rem] text-center mr-[0.5rem] leading-[1.5rem] px-[0.7rem]">
                        VĂN PHÒNG
                      </span>
                    )}
                    <span className="text-[1.4rem] leading-[2.1rem] mb-[0.6rem] ">
                      {item.deliveryAddress}
                    </span>
                  </div>
                  <div className="text-[1.2rem] text-gray7 mb-[1.2rem]">
                    Mã vùng: {item.province.name} - {item.district.name} -{" "}
                    {item.ward.name}
                  </div>
                  {item.isDefault && (
                    <div>
                      <span className="text-[1.2rem] text-cyan leading-[1.4rem] py-[0.2rem] px-[0.5rem] mr-[0.6rem] rounded-[0.4rem] border border-solid border-cyan ">
                        Địa chỉ nhận hàng mặc định
                      </span>
                      <span className="text-[1.2rem] text-cyan leading-[1.4rem] py-[0.2rem] px-[0.5rem] mr-[0.6rem] rounded-[0.4rem] border border-solid border-cyan ">
                        Địa chỉ thanh toán mặc định
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[2.4rem] text-center">
            <button
              onClick={() => setIsShowUserAddress(false)}
              className="text-[1.4rem] min-w-[16.8rem] h-[4rem] leading-[4rem] px-[3.6rem] rounded-[0.2rem] text-center bg-gray6 text-gray7">
              HUỶ
            </button>
            <button
              onClick={handleSaveDefaultAddress}
              className="text-[1.4rem] min-w-[16.8rem] h-[4rem] leading-[4rem] px-[3.6rem] rounded-[0.2rem] text-center bg-cyan text-white ml-[1.2rem]">
              LƯU
            </button>
          </div>
        </div>
        <div
          ref={addressFormRef}
          className={`fixed inset-0 translate-transition w-[84rem] h-[57rem] m-auto bg-white overflow-auto ${
            isShowAddressForm ? "z-[9999]" : "translate-y-[-111%] z-0"
          }`}>
          <AddressForm
            isCreate={false}
            setShowFormModal={setIsShowAddressForm}
            addressDetail={null}
          />
        </div>
      </section>
    </>
  );
};

export default DeliveryAddressInfo;
