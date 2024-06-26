"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { handleAddItemToCancelation } from "@/lib/features/cancellations/cancellationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewOrder = () => {
  const orderedDetail: TOrdered = useAppSelector(
    (state) => state.ordered.orderedDetail
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!orderedDetail.id) {
      router.push("/account");
      return;
    }

    const orderedNotCancel = orderedDetail.items.filter((item) => !item.status);
    const totalPrice = orderedNotCancel.reduce(
      (sum, item) => (sum += item.newPrice),
      0
    );
    setTotalPrice(totalPrice);
  }, [orderedDetail, router]);

  const handleCancelOrdered = async () => {
    const { id: idOrdered, items } = orderedDetail;
    const filteredItems = items.filter((item) => !item.status);
    await dispatch(
      handleAddItemToCancelation({ idOrdered, items: filteredItems })
    );
    router.push("/cancellations");
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Chi tiết đơn hàng
            </h1>
            <div className="bg-white w-full pb-[2.4rem] mb-[1.2rem]">
              <div className="flex items-center justify-between h-[5.6rem] border-b border-solid border-[#dadada] px-[1.2rem]">
                <div className="text-green text-[1.4rem]">
                  Dự kiến giao: {orderedDetail.estimatedTime}
                </div>
                {orderedDetail.items?.filter((item) => item.status)?.length !==
                orderedDetail.items?.length ? (
                  <div className="text-[1.4rem] bg-[#ecf0f7] py-[0.3rem] px-[1.2rem] rounded-full">
                    Đang chuẩn bị đơn hàng
                  </div>
                ) : (
                  <div className="text-[1.4rem] bg-[#ecf0f7] py-[0.3rem] px-[1.2rem] rounded-full">
                    Đã huỷ
                  </div>
                )}
              </div>
              <div className="">
                {orderedDetail &&
                  orderedDetail.items?.map((item: TCart) => (
                    <div
                      key={item.id}
                      className="w-[91.6rem] min-h-[8rem] pt-[2.4rem] pr-[1.2rem] pl-[3.6rem] flex items-start">
                      <Link
                        href={`product/${item.slugCategoryChildren}/${item.slug}`}>
                        <Image src={item.image} width={80} height={80} alt="" />
                      </Link>
                      <div className="w-[36rem] ml-[1.2rem] mr-[2.4rem] ">
                        <Link
                          href={`product/${item.slugCategoryChildren}/${item.slug}`}
                          className="line-clamp-2 text-[1.4rem] mb-[0.3rem] ">
                          {item.name}
                        </Link>
                        <p className="mt-[0.6rem] text-[1.4rem] text-gray leading-[1.8rem] line-clamp-2">
                          {item.firstChoice}
                          {item.secondChoice && ", " + item.secondChoice}.
                        </p>
                        <div className="text-[1.4rem] text-blue p-[0.2rem] mt-[1.2rem] mr-[0.4rem] border border-solid border-blue rounded-[0.4rem] inline-block">
                          Trả Hàng Miễn Phí
                        </div>
                        {item.status && (
                          <p className="text-[1.2rem] mt-[0.7rem]">
                            Đã huỷ đơn
                          </p>
                        )}
                      </div>
                      <p className="w-[18rem] mb-[0.4rem] text-[1.4rem]">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.currentPrice)}
                      </p>
                      <div className="w-[6.4rem] text-[1.4rem] flex-1">
                        <p className="text-gray7">Số lượng:</p>
                        <span>{item.quantity}</span>
                      </div>
                      {item.status || (
                        <div className="text-[1.4rem] text-cyan cursor-pointer">
                          <p onClick={handleCancelOrdered}>Huỷ</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-white w-full min-h-[5rem] p-[1.2rem] flex justify-between">
              <div>
                <p className="text-[1.4rem] mb-[0.4rem]">
                  Đơn hàng {orderedDetail.id}
                </p>
                <p className="text-gray text-[1.2rem] mb-[0.4rem]">
                  Đặt ngày {orderedDetail.orderTime}
                </p>
                <p className="text-[1.2rem] mb-[0.6rem]">
                  Trả tiền bởi {orderedDetail.method}
                </p>
              </div>
            </div>
            <div className="flex mt-[1.2rem] justify-between gap-[1.2rem] items-start">
              <div className="bg-white w-full h-[12.5rem] py-[1rem] px-[1.2rem] box-border">
                <span className="text-[1.4rem] left-[2rem]">
                  {orderedDetail.address?.username}
                </span>
                <p>
                  {orderedDetail.address?.type === "home" && (
                    <span className="bg-orange font-bold text-white rounded-full text-[1.2rem] py-[0.2rem] px-[1rem] mr-[0.4rem]">
                      HOME
                    </span>
                  )}
                  {orderedDetail.address?.type === "office" && (
                    <span className="bg-cyan font-bold text-white rounded-full text-[1.2rem] py-[0.2rem] px-[1rem] mr-[0.4rem]">
                      WORK
                    </span>
                  )}

                  <span className="text-[1.4rem] left-[2rem]">
                    {orderedDetail.address?.deliveryAddress},{" "}
                    {orderedDetail.address?.province.name},{" "}
                    {orderedDetail.address?.district.name},{" "}
                    {orderedDetail.address?.ward.name}
                  </span>
                </p>
                <span className="text-[1.4rem] left-[2rem]">
                  {orderedDetail.address?.phoneNumber}
                </span>
              </div>
              <div className="bg-white w-full py-[1rem] px-[1.2rem] box-border">
                <div className="text-[1.8rem] mb-[0.9rem]">Tổng cộng</div>
                <div className="flex justify-between h-[1.6rem] leading-[1.6rem] mb-[0.5rem] text-[1.4rem]">
                  <span>
                    Tổng Tiền(
                    {
                      orderedDetail.items?.filter((item) => !item.status).length
                    }{" "}
                    Sản phẩm)
                  </span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between h-[1.6rem] leading-[1.6rem] mb-[0.5rem] text-[1.4rem]">
                  <span>Phí vận chuyển</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      orderedDetail.items?.filter((item) => !item.status)
                        .length * 15000
                    )}
                  </span>
                </div>
                <hr className=" my-[1.4rem] block relative border-none h-[0.1rem] after:absolute after:bg-[#dadada] after:h-[0.1rem] after:w-full after:left-0 after:bottom-0" />
                <div className="flex justify-between h-[1.6rem] leading-[1.6rem] mb-[0.5rem] text-[1.4rem]">
                  <span>Tổng cộng</span>
                  <span className="text-[1.8rem]">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      totalPrice +
                        orderedDetail.items?.filter((item) => !item.status)
                          .length *
                          15000
                    )}
                  </span>
                </div>
                <div className="flex justify-between h-[1.6rem] leading-[1.6rem] mb-[0.5rem] text-[1.4rem]"></div>
                <p className="h-[1.6rem] leading-[1.6rem] mb-[0.5rem] text-[1.4rem]">
                  Thanh toán bằng hình thức {orderedDetail.method}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewOrder;
