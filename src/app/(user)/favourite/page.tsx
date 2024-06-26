"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { getToken } from "@/helpers/common";
import { handleAddToCart } from "@/lib/features/cart/cartSlice";
import { addAllToCart, fetchCart } from "@/lib/features/cart/cartThunk";
import { deleteOne } from "@/lib/features/favourites/favouritesThunk";
import { handleReload } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart, FaRegTrashCan } from "react-icons/fa6";
import { ImCart } from "react-icons/im";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const MyFavourite = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const favouritesItems = useAppSelector(
    (state) => state.favourites.favouritesItems
  );

  const handleAddOneToCart = async (item: TCart) => {
    const dataCart: TDataCart = {
      ...item,
      price: item.currentPrice,
      quantity: 1,
      status: false,
    };
    ["newPrice", "currentPrice"].forEach((e) => delete (dataCart as any)[e]);

    const result = await dispatch(fetchCart({ dataCart, token })).unwrap();
    if (result.status === "success") {
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Thêm vào giỏ hàng thành công !!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteOne = async (id: number) => {
    const result = await Swal.fire({
      title: "Xóa khỏi danh sách yêu thích",
      text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      showCancelButton: true,
      cancelButtonText: "HUỶ",
      confirmButtonColor: "#37cfdd",
      cancelButtonColor: "#ff531d",
      confirmButtonText: "XOÁ",
    });
    if (result.isConfirmed) {
      if (token) {
        await dispatch(deleteOne({ id, token })).unwrap();
      }
    }
  };

  const handleAddAllToCart = async () => {
    if (favouritesItems.length) {
      if (token) {
        const response = await dispatch(
          addAllToCart({ arrItems: favouritesItems, token })
        ).unwrap();
        if (response.status === "success") {
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Thêm vào giỏ hàng thành công !!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      MySwal.fire({
        position: "center",
        icon: "warning",
        title: "Chưa có danh mục yêu thích",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between gap-[4.3rem]">
        <AccountNavbar />
        <section className="flex-1">
          <h1 className="text-[2.2rem] font-normal leading-[6rem]">
            Danh sách yêu thích ({favouritesItems?.length})
          </h1>
          <div className="h-[4.8rem] pl-[1.4rem] my-[1.2rem] bg-white">
            <p
              onClick={handleAddAllToCart}
              className="text-[1.4rem] text-cyan leading-[4.8rem] cursor-pointer inline-block">
              THÊM TẤT CẢ VÀO GIỎ HÀNG
            </p>
          </div>
          <div className="">
            {favouritesItems.length ? (
              favouritesItems.map((item: TCart) => {
                return (
                  <div
                    key={item.id}
                    className="bg-white w-full pl-[2rem] border-b border-solid border-gray2 last:border-b-0">
                    <div className="py-[1.6rem] px-[2rem] flex items-start">
                      <figure className="mr-[1.2rem]">
                        <Image src={item.image} alt="" width={80} height={80} />
                      </figure>
                      <div className="flex-1 mr-[3.6rem]">
                        <Link
                          href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
                          className="text-[1.4rem]">
                          {item.name}
                        </Link>
                        <p className="text-[1.2rem] my-[0.8rem] text-gray">
                          {item.firstChoice}
                          {item.secondChoice && ", " + item.secondChoice}.
                        </p>
                        <FaRegTrashCan
                          onClick={() => handleDeleteOne(item.id)}
                          className="size-[2rem] text-gray3 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-[1.8rem] text-orange mb-[0.8rem]">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.newPrice)}
                        </div>
                        {item.discount !== 0 && (
                          <>
                            <span className="text-[1.4rem] text-gray line-through ">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.currentPrice)}
                            </span>
                            <span className="text-[1.4rem] inline-block ml-[0.8rem]">
                              -{item.discount}%
                            </span>
                            <p className="text-[1.4rem] text-green">Giá giảm</p>
                          </>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handleAddOneToCart(item)}
                          className="text-white text-[1.6rem] bg-secondary w-[7.2rem] h-[3.2rem] flex justify-center items-center">
                          &#43;
                          <ImCart />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <FaRegHeart className="size-[2rem] text-gray3 block w-full" />
                <p className="text-[1.4rem] text-gray7">
                  Chưa có danh mục yêu thích
                </p>
                <p className="text-[1.4rem] text-gray7">
                  Thêm sản phẩm vào danh sách yêu thích để hiển thị ở đây.
                </p>
                <Link
                  href={"/categories/cua-hang"}
                  className="border border-solid border-orange text-orange text-[1.2rem] block h-[3.2rem] leading-[3.2rem] uppercase w-[16rem] mt-[4rem] mx-auto">
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

export default MyFavourite;
