"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { ratingDescriptions } from "@/constants/ratingsDescriptions";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { GoStarFill } from "react-icons/go";

const MyReview = () => {
  const evaluateItems = useAppSelector((state) => state.user.evaluateItems);

  return (
    <main className="bg-white2">
      <div className="container flex justify-between gap-[4.3rem]">
        <AccountNavbar />
        <div className="w-[98.8rem]">
          <section className="flex-1">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Nhận xét của tôi
            </h1>
            <div className="bg-white w-full h-[5rem] mb-[1.6rem]">
              <div className="flex text-[1.4rem] font-bold h-full items-center">
                <div className="mx-[2.4rem] cursor-pointer relative h-full flex items-center text-orange after:w-full after:absolute after:bottom-0 after:left-0 after:h-[0.5rem] after:bg-orange">
                  Lịch sử đánh giá{" "}
                  {evaluateItems.length > 0 && `(${evaluateItems.length})`}
                </div>
              </div>
            </div>
            {evaluateItems?.length ? (
              evaluateItems.map((item: TEvaluates) => {
                return (
                  <div key={item.id}>
                    <div className="mb-[0.9rem] py-[1.6rem] px-[2.4rem] bg-white text-[1.4rem] overflow-hidden">
                      <p className="text-gray9 mb-[1.3rem]">
                        Đã đánh giá {item.time}
                      </p>
                      <div className="text-[1.2rem] mb-[0.6rem] font-bold">
                        Nhận xét và đánh giá về sản phẩm
                      </div>
                      <div className="flex w-[60%]">
                        <Link
                          href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
                          className="block mb-[0.9rem]">
                          <Image
                            src={item.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </Link>
                        <div
                          className="pl-[1.6rem]"
                          style={{ width: "calc(100% - 5.6rem)" }}>
                          <Link href={""} className="line-clamp-1">
                            {item.name}
                          </Link>
                          <div className="flex items-center">
                            {[...Array(item.star)].map((_, index) => {
                              return (
                                <Fragment key={index}>
                                  <GoStarFill
                                    color={"#faca51"}
                                    size={32}
                                    className="mr-[0.5rem]"
                                  />
                                </Fragment>
                              );
                            })}
                            <div>{ratingDescriptions[item.star - 1]}</div>
                          </div>
                          <div className="py-[1.5rem] px-[1.2rem] border border-solid border-gray8 bg-gray6 mt-[1.7rem]">
                            <div className="line-clamp-3">{item.content}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white mt-[1.6rem] w-full h-[32.6rem] flex justify-center items-center overflow-hidden">
                <p className="text-[1.6rem]">Bạn vẫn chưa viết nhận xét nào</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default MyReview;
