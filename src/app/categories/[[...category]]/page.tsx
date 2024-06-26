"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { filtersCategories } from "@/lib/features/filtersCategory/filtersThunk";
import { getFilters } from "@/helpers/getFilters";
import { TCategories, TCategoriesChild } from "@/types/categories";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchProducts } from "@/lib/features/products/productsThunk";
import {
  handleCategoriesChildren,
  handleCategoryParent,
  handlePriceMax,
  handlePriceMin,
  handleSortTag,
  resetCategoriesChildren,
  resetSortTag,
} from "@/lib/features/products/productsSlice";
import FilterProductChild from "@/components/FilterProductChild";
import Pagination from "@/components/Pagination";

const Category = ({
  params: { category },
}: {
  params: { category: string[] };
}) => {
  const dispatch = useAppDispatch();
  const objFilterCategories = useAppSelector(
    (state) => state.filtersCategory.objFilter
  );
  const filterCategoriesData = objFilterCategories?.data;

  const objProducts = useAppSelector((state) => state.products.productList);
  const productList = objProducts.data?.productList;

  const categoryData = useAppSelector((state) => state.categories.categoryList);
  const categoryList = categoryData?.data?.categories;
  const categoryParent = categoryList?.find((categoryParent: TCategories) => {
    if (categoryParent.slug !== category[1]) {
      return categoryParent.children.some(
        (child) => child.slug === category[1]
      );
    }
    return categoryParent.slug === category[1];
  });

  const categoryChild = categoryParent?.children.find(
    (child: TCategoriesChild) => child.slug === category[2]
  );

  const queries = useAppSelector((state) => state.products.queries);
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(handleCategoryParent(category[1]));
    dispatch(resetSortTag());
    dispatch(resetCategoriesChildren());
    dispatch(handlePriceMin(""));
    dispatch(handlePriceMax(""));

    if (category[2]) {
      dispatch(handleCategoriesChildren(category[2]));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const queryString = Object.keys(queries)
      .filter((key) => queries[key] !== undefined && queries[key] !== null)
      .map((key) => {
        if (Array.isArray(queries[key])) {
          return queries[key]
            .map((value: any) => `${key}[]=${value}`)
            .join("&");
        } else {
          return `${key}=${queries[key]}`;
        }
      })
      .join("&");

    dispatch(fetchProducts(queryString));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  useEffect(() => {
    dispatch(filtersCategories(category[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleSortTag(e.target.value));
  };

  const [productLength, setProductLength] = useState<number>(0);

  const handleGetProductLength = (length: number) => {
    setProductLength(length);
  };

  return (
    <main>
      <section className="container pt-[2rem] flex justify-between items-center">
        <Breadcrumb
          categoryParent={categoryParent}
          categoryChild={categoryChild}
        />
        <div className="flex items-center">
          <p className="mr-[1.4rem] text-[1.4rem]">
            Xem tất cả{" "}
            {productList?.length ? productLength : productList?.length} kết quả
          </p>
          <select
            onChange={handleFilterTag}
            className="text-[1.4rem] border border-gray3 border-solid px-[1.1rem] my-[0.5rem] h-[3.25rem] outline-none">
            <option value="">Thứ tự mặc định</option>
            <option value="popularity">Thứ tự theo mức độ phổ biến</option>
            <option value="evaluate">Thứ tự theo điểm đánh giá</option>
            <option value="new">Thứ tự theo sản phẩm mới</option>
            <option value="priceAsc">Thứ tự theo giá: thấp đến cao</option>
            <option value="priceDesc">Thứ tự theo giá: cao xuống thấp</option>
          </select>
        </div>
      </section>
      <section className="container pt-12 flex justify-between">
        <div className="px-6 pb-6">
          <FilterProductChild />
          <div>
            {filterCategoriesData?.filterList.map(
              (filterItem: any, index: number) => (
                <div key={index}>
                  {getFilters(filterItem?.id, filterItem, category[2])}
                </div>
              )
            )}
          </div>
        </div>
        <div className="px-2 pb-[1.9rem] flex-1">
          {productList?.length ? (
            <Pagination
              itemsPerPage={12}
              productList={productList}
              onHandleGetProductLength={handleGetProductLength}
            />
          ) : (
            <div className="text-center text-[1.6rem]">
              <p className="mt-[1.8rem]">
                Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Category;
