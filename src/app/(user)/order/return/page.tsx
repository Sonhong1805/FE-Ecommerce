import AccountNavbar from "@/components/AccountNavbar";
import Link from "next/link";
import React from "react";

const ReturnOrder = () => {
  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Đơn hàng đổi trả
            </h1>
            <div className="pt-[8rem] text-center">
              <p className="text-[1.4rem] text-gray mb-[2.7rem]">
                Không có đơn hàng đổi trả
              </p>
              <Link
                href={"/categories/cua-hang"}
                className="border border-solid border-orange text-orange text-[1.2rem] block h-[3.2rem] leading-[3.2rem] uppercase w-[16rem] mx-auto">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReturnOrder;
