"use client";
import React, { useEffect } from "react";
import "../style.scss";
import AccountNavbar from "@/components/AccountNavbar";
import AddressForm from "@/components/AddressForm";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const EditAddress = () => {
  const router = useRouter();
  const addressDetail = useAppSelector((state) => state.user.addressDetail);

  useEffect(() => {
    if (!addressDetail.id) {
      router.push("/account/address");
    }
  }, [addressDetail, router]);

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Chỉnh sửa địa chỉ
            </h1>
            <div className="bg-white py-[1.6rem] px-[4rem]">
              <AddressForm
                isCreate={true}
                setShowFormModal={null}
                addressDetail={addressDetail}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EditAddress;
