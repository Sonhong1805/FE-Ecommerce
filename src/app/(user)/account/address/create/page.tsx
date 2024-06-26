"use client";
import AccountNavbar from "@/components/AccountNavbar";
import AddressForm from "@/components/AddressForm";
import React from "react";
import "../style.scss";

const CreateAddress = () => {
  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Thêm địa chỉ mới
            </h1>
            <div className="bg-white py-[1.6rem] px-[4rem]">
              <AddressForm
                isCreate={true}
                setShowFormModal={null}
                addressDetail={null}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CreateAddress;
