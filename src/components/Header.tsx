"use client";
import { handleProductName } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ImCart } from "react-icons/im";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/helpers/common";
import { fetchUserMe } from "@/lib/features/user/userThunk";
import {
  handleInitialAddress,
  handleInitialEvaluates,
  handleInitialInfoUser,
  handleReload,
  handleResetUser,
} from "@/lib/features/user/userSlice";
import {
  handleInitialCart,
  handleResetCart,
} from "@/lib/features/cart/cartSlice";
import { handleInitialPayment } from "@/lib/features/payment/paymentSlice";
import {
  handleInitialOrdered,
  handleOrderedDetail,
} from "@/lib/features/ordered/orderedSlice";
import { handleInitialFavourites } from "@/lib/features/favourites/favouritesSlice";
import { handleInitialCancelled } from "@/lib/features/cancellations/cancellationsSlice";
import { fetchAllProduct } from "@/lib/features/products/productsThunk";
import { CiCircleRemove, CiFaceSmile, CiHeart, CiStar } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const searchValue = searchRef.current?.value;
    await dispatch(handleProductName(searchValue));
    router.push("/categories/cua-hang");
  };

  const isReload = useAppSelector((state) => state.user.isReload);

  const userLoggedIn = useAppSelector((state) => state.user.userLoggedIn);
  const currentUser = userLoggedIn?.data?.user;

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (searchRef.current) {
        searchRef.current.value = "";
      }
      await dispatch(handleProductName(""));
      const initialToken = getToken();
      setToken(initialToken);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserMe(token));
    } else {
      setToken("");
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token && currentUser) {
      const initialData = async () => {
        const userData = [
          { data: currentUser.cart || [], action: handleInitialCart },
          { data: currentUser.payment || [], action: handleInitialPayment },
          { data: currentUser.address || [], action: handleInitialAddress },
          { data: currentUser.ordered || [], action: handleInitialOrdered },
          {
            data: currentUser.favourites || [],
            action: handleInitialFavourites,
          },
          { data: currentUser.cancelled || [], action: handleInitialCancelled },
          { data: currentUser.evaluates || [], action: handleInitialEvaluates },
        ];

        await Promise.all(
          userData.map((item) => dispatch(item.action(item.data)))
        );

        const dataInfo = {
          username: currentUser.username,
          avatar: currentUser.avatar,
          email: currentUser.email,
          dateOfBirth: currentUser.dateOfBirth,
          gender: currentUser.gender,
          phoneNumber: currentUser.phoneNumber,
          taxCode: currentUser.taxCode,
        };

        await dispatch(handleInitialInfoUser(dataInfo));
      };

      initialData();
    }
  }, [dispatch, currentUser, token]);

  useEffect(() => {
    dispatch(fetchAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartItems) {
      const totalQuantity = cartItems.reduce(
        (total: number, item: TCart) => total + item.quantity,
        0
      );
      setTotalQuantity(totalQuantity);
    }
  }, [cartItems, dispatch]);

  const { data: session } = useSession();

  const handleLogout = () => {
    removeToken();
    dispatch(handleReload(false));
    dispatch(handleResetUser());
    dispatch(handleResetCart());

    if (session && session.user) {
      signOut();
    }
  };

  const orderedItems = useAppSelector((state) => state.ordered.orderedItems);
  const handleReviewOrdered = async (item: TOrdered) => {
    await dispatch(handleOrderedDetail(item));
    router.push("/order/view");
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-[9999]">
      <div className="bg-dark4">
        <ul className="container flex justify-end items-center gap-[2.5rem]">
          <li className="mx-[0.7rem]">
            <Link
              href="/"
              className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase">
              Chăm sóc khách hàng
            </Link>
          </li>
          <li className="mx-[0.7rem] relative group">
            <Link
              href=""
              className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase">
              Kiểm tra đơn hàng
            </Link>
            <ul className="absolute z-[9999] w-[28rem] text-[1.2rem] bg-white right-[-50%] pt-[2.5rem] px-[2.5rem] pb-[1rem] border border-solid border-gray hidden group-hover:block">
              <div className="text-[1.6rem] leading-[1.8rem] mb-[1.2rem]">
                Đơn hàng gần đây
              </div>
              {orderedItems?.length ? (
                orderedItems.map((item: TOrdered) => (
                  <li
                    key={item.id}
                    className="text-cyan my-[0.3rem] cursor-pointer hover:underline"
                    onClick={() => handleReviewOrdered(item)}>
                    {item.orderTime} - Order {item.id}
                  </li>
                ))
              ) : (
                <div className="text-[1.4rem] text-center mb-[1.2rem]">
                  Hiện chưa có đơn hàng nào
                </div>
              )}
            </ul>
          </li>
          {token ? (
            <>
              <li className="mx-[0.7rem] relative group">
                <Link
                  href="/account"
                  className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase ">
                  Tài Khoản {currentUser?.username}
                </Link>
                <ul className="absolute z-[9999] w-[30rem] text-[1.4rem] bg-white right-[-50%] pt-[2.5rem] px-[2.5rem] pb-[1rem] border border-solid border-gray hidden group-hover:block">
                  <li className="flex items-center gap-[1.5rem] py-[0.5rem] mb-[1.5rem]">
                    <CiFaceSmile size={26} />
                    <Link href={"/account"} className="flex-1 ">
                      Quản lý tài khoản
                    </Link>
                  </li>
                  <li className="flex items-center gap-[1.5rem] py-[0.5rem] mb-[1.5rem]">
                    <BsBox2 size={20} className="w-[2.6rem]" />
                    <Link href={"/order"} className="flex-1 ">
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li className="flex items-center gap-[1.5rem] py-[0.5rem] mb-[1.5rem]">
                    <CiHeart size={26} />
                    <Link href={"/favourite"} className="flex-1 ">
                      Danh sách yêu thích
                    </Link>
                  </li>
                  <li className="flex items-center gap-[1.5rem] py-[0.5rem] mb-[1.5rem]">
                    <CiStar size={26} />
                    <Link href={"/review"} className="flex-1 ">
                      Nhận xét của tôi
                    </Link>
                  </li>
                  <li className="flex items-center gap-[1.5rem] py-[0.5rem] mb-[1.5rem]">
                    <CiCircleRemove size={26} />
                    <Link href={"/order/cancel"} className="flex-1 ">
                      Đơn hàng huỷ
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <Link
                  href=""
                  onClick={handleLogout}
                  className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase">
                  Đăng xuất
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mx-[0.7rem]">
                <Link
                  href="/login"
                  className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase">
                  Đăng nhập
                </Link>
              </li>
              <li className="">
                <Link
                  href="/signup"
                  className="text-white text-[1.2rem] opacity-50 hover:opacity-100 py-[0.7rem] block uppercase">
                  Đăng ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="bg-primary border border-dark4 border-solid">
        <div className="container h-[7.5rem] flex items-center justify-between">
          <Link
            href={"/"}
            className="mr-12 block relative"
            style={{ width: 124, height: 23.2 }}>
            <Image src={"/svg/logo.svg"} alt="logo" fill />
          </Link>
          <div className="flex-1 flex items-center gap-[1.4rem]">
            <form className="flex w-[72%]" onSubmit={handleSubmit}>
              <input
                type="search"
                className="text-[1.2rem] h-[3.8rem] px-[0.9rem] w-full border border-solid border-gray2 outline-none"
                placeholder="Tìm sản phẩm, thương hiệu và tên shop"
                ref={searchRef}
              />
              <button
                type="submit"
                className="bg-secondary text-white size-[3.8rem] flex items-center justify-center text-[2rem]">
                <PiMagnifyingGlassBold />
              </button>
            </form>
            <Link href={"/cart"} className="relative cursor-pointer">
              <ImCart className="text-white w-8 h-8" />
              {cartItems?.length > 0 && (
                <div className="bg-secondary size-[1.7rem] text-[1.1rem] text-white absolute top-[-1rem] right-[-1rem] flex justify-center items-center rounded-full font-bold ">
                  {totalQuantity}
                </div>
              )}
            </Link>
          </div>
          <div>
            <Image
              src={"/images/header-promotion.png"}
              alt="header-promotion"
              width={170}
              height={41.73}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
