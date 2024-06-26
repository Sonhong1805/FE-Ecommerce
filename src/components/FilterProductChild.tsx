import { handleProductName } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useRef } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const FilterProductChild = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const searchValue = searchRef.current?.value;
    dispatch(handleProductName(searchValue));
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="text-[1.4rem] font-bold">LỌC SẢN PHẨM</span>
      <div className="h-[0.3rem] bg-[rgba(0,0,0,0.1)] w-12 mt-4 mb-[1.4rem]"></div>
      <div className="pb-[0.5rem] min-w-[27rem] mb-[0.9rem] relative">
        <input
          type="text"
          placeholder="Bạn muốn tìm gì?"
          className="p-[0.9rem] border border-gray2 border-solid w-full text-[1.4rem]"
          ref={searchRef}
        />
        <button type="submit" className="absolute top-2/4 right-2">
          <PiMagnifyingGlassLight className=" translate-y-[-50%] cursor-pointer text-[2.4rem]" />
        </button>
      </div>
    </form>
  );
};

export default FilterProductChild;
