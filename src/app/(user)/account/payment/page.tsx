import AccountNavbar from "@/components/AccountNavbar";
import React from "react";
import { PiCreditCardLight } from "react-icons/pi";

const PaymentOptionsAccount = () => {
  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Chọn phương thức thanh toán
            </h1>
            <div className="bg-white pt-[9.5rem] pb-[13rem] text-center text-gray">
              <PiCreditCardLight className="w-full text-[8rem] mb-[1rem]" />
              <p className="text-[1.4rem]">Không có tùy chọn thanh toán</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentOptionsAccount;
