import { convertSold } from "@/helpers/convert";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoStarFill } from "react-icons/go";

type TProductItemProps = {
  item: TProduct;
  isSwiper: boolean;
};
const ProductItem = ({ item, isSwiper }: TProductItemProps) => {
  const price = Math.round(item.price - (item.price * item.discount) / 100);
  const priceFormatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  const priceRoot = new Intl.NumberFormat("vi-VN").format(item.price);
  return (
    <div className={`${isSwiper ? "flex-1" : "px-4 pb-[1.9rem]"} h-full `}>
      <div className={`${isSwiper ? "h-[38.7rem]" : "h-full"} shadow`}>
        <Link
          href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
          className={`${isSwiper ? "h-[23.35rem]" : ""} block`}>
          <Image
            src={item.images[0]}
            width={500}
            height={500}
            alt=""
            priority={true}
          />
        </Link>
        <div className="p-4 pb-[1.7rem] text-center">
          <Link
            href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
            className="text-dark2 text-[1.4rem] line-clamp-2 hover:text-secondary">
            {item.name}
          </Link>
          <div className="text-secondary text-[1.4rem] font-bold">
            {priceFormatted}
          </div>
          {item.discount !== 0 && (
            <div className="flex justify-between text-dark2 text-[1.2rem]">
              <span className="line-through">{priceRoot} ₫</span>
              <span>-{item.discount}% off</span>
            </div>
          )}
          <div className="flex items-center justify-between flex-wrap text-[0.6rem] gap-2 mt-2">
            <p className=" text-[1.2rem]">Đã bán {convertSold(item.sold)}</p>
            <div className="flex items-center justify-center text-[1.2rem]">
              {Array.from({ length: 5 }).map((_, index) => (
                <GoStarFill key={index} className="text-yellow" />
              ))}
              ({item.evaluates.length})
            </div>
          </div>
          <div className="mt-2">
            <p className="text-[1.2rem] text-dark2 text-end">
              {item.address.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
