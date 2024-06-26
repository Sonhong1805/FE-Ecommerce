"use client";
import CartItem from "@/components/CartItem";
import { getToken } from "@/helpers/common";
import groupItems from "@/helpers/groupItems";
import {
  changedInputsChecked,
  handleUpdateStatusCart,
  removeIdsInputChecked,
  removeItemsCart,
  resetInputsChecked,
  updateInputCheckedAll,
} from "@/lib/features/cart/cartSlice";
import {
  changeInputsChecked,
  changeQuantity,
  decreaseQuantity,
  deleteInputsChecked,
  increaseQuantity,
} from "@/lib/features/cart/cartThunk";
import { handleInitialPayment } from "@/lib/features/payment/paymentSlice";
import { fetchUnpaid } from "@/lib/features/payment/paymentThunk";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const CartPage = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalShippingCost, setTotalShippingCost] = useState<number>(0);

  const [userAddress, setUserAddress] = useState<TUserAddress | null>(null);
  const addressItems = useAppSelector((state) => state.user.addressItems);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const addressDefault = addressItems?.find(
      (address: TUserAddress) => address.isDefault
    );
    setUserAddress(addressDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, addressItems]);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const inputsChecked = useAppSelector((state) => state.cart.inputsChecked);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const updateInputsChecked = async () => {
      if (token) {
        await dispatch(changeInputsChecked({ inputsChecked, token })).unwrap();
        await dispatch(handleUpdateStatusCart(inputsChecked));
      }
    };
    updateInputsChecked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputsChecked]);

  useEffect(() => {
    const totalPrice = cartItems
      ?.filter((item: TCart) => inputsChecked.includes(item.id))
      ?.reduce((a: number, b: TCart) => (a += b.newPrice), 0);
    setTotalPrice(totalPrice);
    const groupCart = groupItems(
      cartItems?.filter((item: TCart) => inputsChecked.includes(item.id))
    );
    setTotalShippingCost(groupCart?.length);
  }, [cartItems, inputsChecked]);

  const handleIncreaseQuantity = async (id: number) => {
    if (token) {
      await dispatch(increaseQuantity({ id, token })).unwrap();
    }
  };
  const handleDecreaseQuantity = async (id: number) => {
    if (token) {
      await dispatch(decreaseQuantity({ id, token })).unwrap();
    }
  };

  const handleChangeQuantity = async (id: number, quantity: number) => {
    if (token) {
      await dispatch(changeQuantity({ id, token, quantity })).unwrap();
    }
  };

  const handleInputsChecked = async (id: number) => {
    await dispatch(changedInputsChecked({ id }));
  };

  const handleInputCheckedAll = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      await dispatch(updateInputCheckedAll());
    } else {
      await dispatch(resetInputsChecked());
    }
  };

  const handleDeleteCart = async () => {
    if (inputsChecked.length) {
      const result = await Swal.fire({
        title: "Xoá khỏi giỏ hàng!",
        text: "Bạn có chắc chắn muốn xóa các mục này không? ",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "HUỶ",
        confirmButtonColor: "#37cfdd",
        cancelButtonColor: "#ff531d",
        confirmButtonText: "ĐỒNG Ý",
      });
      if (result.isConfirmed) {
        if (token) {
          const response = await dispatch(
            deleteInputsChecked({ inputsChecked, token })
          ).unwrap();
          if (response.status === "success") {
            await dispatch(removeItemsCart(inputsChecked));
            await dispatch(removeIdsInputChecked(inputsChecked));
            Swal.fire({
              title: "Xoá thành công!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng chọn ít nhất 1 sản phẩm.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleConfirmCart = async () => {
    if (inputsChecked.length) {
      const selectedItems = cartItems
        .filter((item: TCart) => inputsChecked.includes(item.id))
        .map((item: TCart) => ({ ...item, status: false }));
      if (token) {
        const result = await dispatch(
          fetchUnpaid({ array: selectedItems, token })
        ).unwrap();
        if (result.status === "success") {
          await dispatch(handleInitialPayment(selectedItems));
          router.push("/payment");
        }
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng chọn ít nhất 1 sản phẩm.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <main className="bg-white2">
      {cartItems?.length ? (
        <div className="container flex py-16">
          <div className="flex-1">
            <div className="flex items-center justify-between h-[4rem] px-[1.2rem] bg-white">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    inputsChecked.length > 0 &&
                    inputsChecked.length === cartItems?.length
                  }
                  onChange={handleInputCheckedAll}
                  className="size-[1.6rem] mr-[1.6rem] accent-secondary"
                />
                <span className="text-[1.4rem] uppercase">
                  Chọn tất cả ({inputsChecked.length} - {cartItems?.length || 0}{" "}
                  sản phẩm)
                </span>
              </div>
              <button
                className="flex py-[1rem] text-gray hover:text-secondary"
                onClick={handleDeleteCart}>
                <FaRegTrashCan className="text-[1.6rem] mr-[0.5rem]" />
                <span className="text-[1.4rem] uppercase">Xoá</span>
              </button>
            </div>
            <div className="">
              {cartItems?.length &&
                cartItems?.map((item: TCart) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    inputsChecked={inputsChecked}
                    onHandleInputsChecked={handleInputsChecked}
                    onHandleDecreaseQuantity={handleDecreaseQuantity}
                    onHandleIncreaseQuantity={handleIncreaseQuantity}
                    onHandleChangeQuantity={handleChangeQuantity}
                  />
                ))}
            </div>
          </div>
          <div className="bg-white ml-[1.2rem] w-[38.8rem] p-[1.6rem]">
            <div className="pb-[1.6rem] border-b border-solid border-gray2">
              <div className="text-[1.4rem] text-gray mb-[1.1rem]">
                Địa điểm
              </div>
              <div className="flex items-center gap-[1rem]">
                <CiLocationOn className="text-[2rem] text-gray" />
                {userAddress ? (
                  <span className="text-[1.2rem]">
                    {userAddress.ward.name},{userAddress.district.name},
                    {userAddress.province.name}
                  </span>
                ) : (
                  <span className="text-[1.2rem]">Địa chỉ</span>
                )}
              </div>
            </div>
            <div className="pt-[1.6rem]">
              <div className="text-[1.8rem] mb-[1.4rem]">
                Thông tin đơn hàng
              </div>
              <div className="flex items-center justify-between mb-[1.6rem]">
                <div className="text-[1.4rem] text-gray">
                  Tạm tính ({inputsChecked.length} sản phẩm)
                </div>
                <span className="text-[1.6rem]">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-[1.6rem]">
                <div className="text-[1.4rem] text-gray">Phí vận chuyển</div>
                <span className="text-[1.6rem]">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalShippingCost * 15000)}
                </span>
              </div>
            </div>
            <div className="flex py-[0.8rem]">
              <input
                className="text-[1.4rem] h-[3.8rem] px-[0.9rem] w-full mr-[0.8rem] border border-solid border-gray2 outline-none"
                placeholder="Mã ưu đãi"
              />
              <button className="bg-cyan text-white flex items-center justify-center text-[1.6rem] uppercase px-[1.5rem] whitespace-nowrap">
                Áp dụng
              </button>
            </div>
            <div className="pt-[1rem]">
              <div className="flex justify-between mb-[1.6rem]">
                <div className="text-[1.6rem]">Tổng cộng</div>
                <div className="text-end">
                  <span className="text-[1.8rem] text-secondary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice + totalShippingCost * 15000)}
                  </span>
                  <p className="text-[1.2rem]">Đã bao gồm VAT (nếu có)</p>
                </div>
              </div>
            </div>
            <button
              className="bg-secondary w-full text-white flex items-center justify-center text-[1.6rem] uppercase p-[1rem] whitespace-nowrap"
              onClick={handleConfirmCart}>
              Xác nhận giỏ hàng ({inputsChecked.length})
            </button>
          </div>
        </div>
      ) : (
        <div className="py-[3rem] max-w-[120rem] m-auto">
          <div className="py-[3rem] text-center mb-[6rem]">
            <p className="text-[1.4rem] mb-[1.8rem]">
              Chưa có sản phẩm nào trong giỏ hàng
            </p>
            <button
              className="bg-secondary text-white mb-[1.6rem] text-[1.4rem] px-[1.6rem] min-h-[4rem]"
              onClick={() => router.push("/categories/cua-hang")}>
              Quay trở lại cửa hàng
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
