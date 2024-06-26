"use client";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import { handleAttribute } from "@/lib/features/products/productsSlice";

interface FilterAttributeProps {
  id: string;
  name: string;
  metadata: TMetadata[];
}

const FilterAttribute = ({ id, name, metadata }: FilterAttributeProps) => {
  const dispatch = useAppDispatch();
  const [isShowCategory, setIsShowCategory] = useState(true);
  const categoryListRef = useRef<HTMLDivElement>(null);
  const [categoryListHeight, setCategoryListHeight] = useState<
    number | undefined
  >(0);

  useEffect(() => {
    if (categoryListRef.current) {
      setCategoryListHeight(
        isShowCategory ? categoryListRef.current.scrollHeight : 0
      );
    }
  }, [isShowCategory, metadata]);

  const handleAttributeFilter = (value: any) => {
    const key = id.split("-")[1];
    dispatch(handleAttribute(key + "-" + value));
  };

  return (
    <>
      <h4 className="font-bold text-[1.6rem] flex justify-between mb-3">
        <span>{name}</span>
        <button onClick={() => setIsShowCategory((prev) => !prev)}>
          {isShowCategory ? <>&#8722;</> : <>&#43;</>}
        </button>
      </h4>
      <div
        ref={categoryListRef}
        className="overflow-hidden"
        style={{
          maxHeight: isShowCategory ? `${categoryListHeight}px` : "0",
          transition: "max-height 0.5s ease",
        }}>
        <ul className="pb-1 mb-2">
          {metadata?.map((item) => (
            <li key={item.value}>
              <input
                type="checkbox"
                id={item.value}
                className="mt-[0.3rem] mr-4 mb-[1.6rem] ml-[0.4rem]"
                onChange={() => handleAttributeFilter(item.value)}
              />
              <label
                htmlFor={item.value}
                className="mb-2 ml-[0.7rem] text-[1.26rem] text-[#222] font-bold">
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FilterAttribute;
