"use client";
import { handleCategoriesChildren } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";

interface FilterCategoryProps {
  name: string;
  metadata: TMetadata[];
  categoryChild: string;
}

const FilterCategory = ({
  name,
  metadata,
  categoryChild,
}: FilterCategoryProps) => {
  const dispatch = useAppDispatch();
  const [isShowCategory, setIsShowCategory] = useState(true);
  const categoryListRef = useRef<HTMLDivElement>(null);
  const [categoryListHeight, setCategoryListHeight] = useState<
    number | undefined
  >(0);

  const handleCategorySlug = (slug: string) => {
    dispatch(handleCategoriesChildren(slug));
  };

  useEffect(() => {
    if (categoryListRef.current) {
      setCategoryListHeight(
        isShowCategory ? categoryListRef.current.scrollHeight : 0
      );
    }
  }, [isShowCategory, metadata]);

  const [expandedItems, setExpandedItems] = useState<any>({});
  const handleToggleItem = (slug: string) => {
    setCategoryListHeight(4511);
    setExpandedItems({
      ...expandedItems,
      [slug]: !expandedItems[slug],
    });
  };

  return (
    !categoryChild && (
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
            {metadata?.map((item: TMetadata) => {
              return (
                <li key={item.id}>
                  <div>
                    <input
                      type="checkbox"
                      id={item.slug}
                      disabled={item.quantity === 0}
                      className={"mt-[0.3rem] mr-4 mb-[1.6rem] ml-[0.4rem]"}
                      onChange={() => handleCategorySlug(item.slug)}
                    />
                    <label
                      htmlFor={item.slug}
                      className="mb-2 ml-[0.7rem] text-[1.26rem] text-[#222] font-bold">
                      {item.name} ({item.quantity})
                    </label>
                    {item.children && (
                      <button
                        className="text-[1.4rem] ml-[1rem] font-bold text-green"
                        onClick={() => handleToggleItem(item.slug)}>
                        {expandedItems[item.slug] ? "-" : "+"}
                      </button>
                    )}
                  </div>
                  <ul
                    className="mt-[0.7rem] ml-[1.5rem] overflow-hidden"
                    style={{
                      maxHeight:
                        item.children && expandedItems[item.slug]
                          ? "100vh"
                          : "0",
                      transition: "max-height 0.5s ease",
                    }}>
                    {item.children?.map((child) => (
                      <li key={child.id}>
                        <input
                          type="checkbox"
                          id={child.slug}
                          disabled={child.quantity === 0}
                          className={"mt-[0.3rem] mr-4 mb-[1.6rem] ml-[0.4rem]"}
                          onChange={() => handleCategorySlug(child.slug)}
                        />
                        <label
                          htmlFor={child.slug}
                          className="mb-2 ml-[0.7rem] text-[1.26rem] text-[#222] font-bold">
                          {child.name} ({child.quantity})
                        </label>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    )
  );
};

export default FilterCategory;
