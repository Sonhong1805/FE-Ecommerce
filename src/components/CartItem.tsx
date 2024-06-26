import { getToken } from "@/helpers/common";
import {
  removeIdsInputChecked,
  removeOneItem,
} from "@/lib/features/cart/cartSlice";
import { deleteOne } from "@/lib/features/cart/cartThunk";
import { addToFavourites } from "@/lib/features/favourites/favouritesThunk";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { FaRegHeart, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const CartItem = ({
  item,
  inputsChecked,
  onHandleDecreaseQuantity,
  onHandleChangeQuantity,
  onHandleIncreaseQuantity,
  onHandleInputsChecked,
}: any) => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || quantity;
    setQuantity(newValue);
  };

  const handleBlur = () => {
    if (quantity !== item.quantity) {
      // onHandleChangeQuantity(item.id, quantity);
    }
  };

  const handleDeleteOne = async () => {
    const result = await Swal.fire({
      title: "Xoá khỏi giỏ hàng!",
      text: "Bạn có đồng ý loại bỏ sản phẩm này khỏi đơn hàng? ",
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
          deleteOne({ id: item.id, token })
        ).unwrap();
        if (response.status === "success") {
          await dispatch(removeOneItem({ id: item.id }));
          await dispatch(removeIdsInputChecked([item.id]));
          Swal.fire({
            title: "Xoá thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  const handleFavourite = async () => {
    const result = await Swal.fire({
      title: "Chuyển đến Danh sách yêu thích",
      text: "Sản phẩm sẽ được thêm vào Danh sách yêu thích và bỏ ra khỏi giỏ hàng.",
      showCancelButton: true,
      cancelButtonText: "HUỶ",
      confirmButtonColor: "#37cfdd",
      cancelButtonColor: "#ff531d",
      confirmButtonText: "DI CHUYỂN",
    });
    if (result.isConfirmed) {
      if (token) {
        const response = await dispatch(
          addToFavourites({ dataFavourites: item, token })
        ).unwrap();
        if (response.status === "success") {
          await dispatch(removeOneItem({ id: item.id }));
          await dispatch(removeIdsInputChecked([item.id]));
          Swal.fire({
            title: "Thành công",
            text: "Mục của bạn được chuyển đến danh sách mong muốn, bạn có thể thêm lại nó vào giỏ hàng từ danh sách mong muốn.",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-between bg-white mt-[1.2rem] px-[1.2rem] py-[1.6rem]">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={inputsChecked.includes(item.id)}
          onChange={() => onHandleInputsChecked(item.id)}
          className="size-[1.6rem] mr-[1.6rem] accent-secondary"
        />
        <Link href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}>
          <Image src={item.image} alt={item.slug} width={80} height={80} />
        </Link>
      </div>
      <div className="flex-1 pl-[1.6rem]">
        <Link
          href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
          className="text-[1.4rem] text-dark font-bold line-clamp-2 hover:text-orange">
          {item.name}
        </Link>
        <p className="text-[1.2rem] font-normal text-dark2">
          {item.firstChoice}
          {item.secondChoice && ", " + item.secondChoice}.
        </p>
      </div>
      <div className="flex-1 text-center">
        <div className="text-[1.8rem] font-medium text-secondary">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.newPrice)}
        </div>
        <div className="mt-[0.5rem] flex items-center gap-[1rem] justify-center">
          <button className="" onClick={handleFavourite}>
            <FaRegHeart className="size-[2rem] text-gray3" />
          </button>
          <button className="" onClick={handleDeleteOne}>
            <FaRegTrashCan className="size-[2rem] text-gray3" />
          </button>
        </div>
      </div>
      <div>
        <div className="flex">
          <button
            disabled={item.quantity === 1}
            className="size-[3.6rem] flex justify-center items-center text-[1.6rem] bg-white3 border border-solid border-gray2"
            onClick={() => onHandleDecreaseQuantity(item.id)}>
            &#8722;
          </button>
          <input
            className="size-[3.6rem] text-center text-[1.4rem] border border-solid border-gray2 shadow3 outline-none"
            value={item.quantity}
            // defaultValue={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className="size-[3.6rem] flex justify-center items-center text-[1.6rem] bg-white3 border border-solid border-gray2"
            onClick={() =>
              onHandleIncreaseQuantity(
                item.id,
                item.currentPrice,
                item.quantity
              )
            }>
            &#43;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
