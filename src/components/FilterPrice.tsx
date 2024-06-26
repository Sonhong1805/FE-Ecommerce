import {
  handlePriceMax,
  handlePriceMin,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { FormEvent, useRef } from "react";
import { GoDash } from "react-icons/go";

const FilterPrice = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const priceMinRef = useRef<HTMLInputElement>(null);
  const priceMaxRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(handlePriceMin(priceMinRef.current?.value));
    dispatch(handlePriceMax(priceMaxRef.current?.value));
  };
  return (
    <>
      <h4 className="font-bold text-[1.6rem] mb-3">{name}</h4>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              placeholder="Tối thiểu"
              className="p-2 w-[11rem] text-[1.4rem] border border-gray2 border-solid"
              ref={priceMinRef}
            />
          </div>
          <GoDash className="mx-4" />
          <div>
            <input
              type="text"
              placeholder="Tối đa"
              className="p-2 w-[11rem] text-[1.4rem] border border-gray2 border-solid"
              ref={priceMaxRef}
            />
          </div>
        </div>
        <button className="px-[1.4rem] py-1 bg-secondary text-white font-bold mt-4 mb-8 text-[1.4rem]">
          Lọc
        </button>
      </form>
    </>
  );
};

export default FilterPrice;
