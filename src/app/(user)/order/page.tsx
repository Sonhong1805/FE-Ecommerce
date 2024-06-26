"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

const ViewOrder = () => {
  const orderedItems = useAppSelector((state) => state.ordered.orderedItems);

  const keywordRef = useRef<HTMLInputElement | null>(null);

  const [orderedArr, setOrderedArr] = useState<TOrdered[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (orderedItems.length > 0) {
      setOrderedArr(orderedItems);
    }
  }, [orderedItems]);

  const handleSearchOrdered = () => {
    const value = keywordRef.current?.value as string;
    const filterOrdered = orderedItems?.filter((item: TOrdered) =>
      item.name.toLowerCase().includes(value?.toLowerCase())
    );

    if (filterOrdered?.length) {
      setOrderedArr(filterOrdered);
    }
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Đơn hàng của tôi
            </h1>
            <div className="">
              <div className="bg-white mb-[1.2rem] py-[0.9rem] px-[1.3rem]">
                <div className="relative flex items-center">
                  <FiSearch className="absolute text-[2.1rem] left-[0.8rem]" />
                  <input
                    ref={keywordRef}
                    placeholder="Tìm kiếm dựa trên tên nhà bán hàng, mã đơn hàng, hoặc tên sản phẩm"
                    className="text-[1.4rem] w-full h-[4rem] px-4 bg-white2 pl-[3.6rem] pr-[0.8rem]"
                    onInput={handleSearchOrdered}
                  />
                </div>
              </div>
              <div className="">
                {orderedArr?.length ? (
                  orderedArr.map((item: TOrdered) => (
                    <div
                      key={item.id}
                      className="bg-white pb-[2.4rem] mb-[1.2rem]">
                      <div className="flex items-center justify-between h-[5.6rem] px-[1.2rem] border-b border-solid border-gray6">
                        <div className="flex items-center">
                          <div className="text-[1.4rem] pl-[2.4rem] text-green">
                            Dự kiến giao {item.estimatedTime}
                          </div>
                        </div>
                        {item.items.every((item) => item.status) ? (
                          <div className="text-[1.4rem] bg-white2 py-[0.4rem] px-[1.2rem] rounded-full">
                            Đã huỷ đơn
                          </div>
                        ) : (
                          <div className="text-[1.4rem] bg-white2 py-[0.4rem] px-[1.2rem] rounded-full">
                            Đang giao hàng
                          </div>
                        )}
                      </div>
                      <div>
                        {item.items.map((child: TCart) => {
                          return (
                            <div
                              key={child.id}
                              className="flex pt-[2.4rem] pl-[3.6rem] pr-[1.2rem] w-[91.6rem]">
                              <Link
                                href={`/product/${child.slugCategoryChildren}/${child.slug}.html`}>
                                <Image
                                  src={child.image}
                                  alt=""
                                  width={80}
                                  height={80}
                                  className="rounded-[0.6rem]"
                                />
                              </Link>
                              <Link
                                href={`/product/${child.slugCategoryChildren}/${child.slug}.html`}
                                className="w-[28rem] ml-[1.2rem] mr-[2.4rem]">
                                <p className="line-clamp-2 text-[1.4rem] mb-[0.6rem]">
                                  {item.name}
                                </p>
                                <div className="text-gray text-[1.4rem]">
                                  {child.firstChoice && (
                                    <span>{child.firstChoice}</span>
                                  )}
                                  {child.secondChoice && (
                                    <span>
                                      {", "}
                                      {child.secondChoice}
                                    </span>
                                  )}
                                </div>
                              </Link>
                              <div className="text-[1.4rem] w-[18rem] mb-[0.4rem]">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(child.newPrice)}
                              </div>
                              <div className="text-[1.4rem] min-h-[8rem]">
                                <div className="text-gray">Số lượng: </div>
                                <div className="text-dark">
                                  {child.quantity}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-[23.9rem] w-full pt-[8rem] text-center">
                    <p className="text-[1.4rem] text-gray7 mb-[2.7rem]">
                      Bạn vẫn chưa có đơn đặt hàng
                    </p>
                    <Link
                      href={"/categories/cua-hang"}
                      className="border border-solid border-orange text-orange text-[1.2rem] block h-[3.2rem] leading-[3.2rem] uppercase w-[16rem] mx-auto">
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewOrder;
