"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CancelOrder = () => {
  const cancelledItems = useAppSelector(
    (state) => state.cancellations.cancelledItems
  );

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Đơn hàng hủy
            </h1>
            {cancelledItems.length ? (
              <div>
                {cancelledItems.map((item: TCancellations) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-white mt-[1.2rem] pb-[2.4rem]">
                      <div className="py-[0.8rem] px-[1.2rem] border-b border-solid border-gray8">
                        <p className="text-[1.4rem] mb-[0.4rem]">
                          Đã hủy vào {item.cancellationsTime}
                        </p>
                        <p className="h-[1.6rem] leading-[1.6rem] text-[1.2rem]">
                          Đơn hàng{" "}
                          <span className="text-cyan">#{item.idOrdered}</span>
                        </p>
                      </div>
                      <div>
                        {item.items.map((child) => {
                          return (
                            <div
                              key={child.id}
                              className="mt-[2.4rem] mr-[1.2rem] mb-[2.4rem] ml-[3.6rem] pr-[1.2rem] w-[91.6rem] flex">
                              <div className="size-[8rem]">
                                <Image
                                  src={child.image}
                                  width={80}
                                  height={80}
                                  alt=""
                                />
                              </div>
                              <div className="w-[28rem] ml-[1.2rem] mr-[2.4rem]">
                                <span className="text-[1.4rem] mb-[0.3rem] line-clamp-2">
                                  {child.name}
                                </span>
                                <p className="text-[1.2rem] font-normal text-dark2">
                                  {child.firstChoice}
                                  {child.secondChoice &&
                                    ", " + child.secondChoice}
                                  .
                                </p>
                              </div>
                              <div className="w-[6,4rem]">
                                <span className="text-[1.4rem] text-gray7 mr-[0.6rem]">
                                  Qty:
                                  <strong className="text-[1.6rem] text-dark font-medium">
                                    {child.quantity}
                                  </strong>
                                </span>
                              </div>
                              <div className="w-[20.4rem] text-center">
                                <div className="text-[1.2rem] py-[0.4rem] px-[1.2rem] inline-block rounded-full bg-gray6 max-w-[15rem]">
                                  Đã huỷ đơn
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pt-[8rem] text-center">
                <p className="text-[1.4rem] text-gray mb-[2.7rem]">
                  Không có đơn hàng hủy
                </p>
                <Link
                  href={"/categories/cua-hang"}
                  className="border border-solid border-orange text-orange text-[1.2rem] block h-[3.2rem] leading-[3.2rem] uppercase w-[16rem] mx-auto">
                  Tiếp tục mua sắm
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CancelOrder;
