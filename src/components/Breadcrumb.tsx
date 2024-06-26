import { useAppSelector } from "@/lib/hooks";
import { TCategories, TCategoriesChild } from "@/types/categories";
import Link from "next/link";
import React from "react";

type TBreadcrumbProps = {
  categoryParent: TCategories;
  categoryChild: TCategoriesChild;
  isDetail?: string;
};

const Breadcrumb = ({
  categoryParent,
  categoryChild,
  isDetail,
}: TBreadcrumbProps) => {
  const productName = useAppSelector(
    (state) => state.products.queries.productName
  );

  return (
    <div>
      <Link
        href={"/"}
        className={`text-gray ${
          isDetail ? "text-[1.4rem]" : "text-[1.6rem]"
        } `}>
        TRANG CHỦ
      </Link>
      <span
        className={`mx-2 opacity-35 ${
          isDetail ? "text-[1.4rem]" : "text-[1.6rem]"
        }`}>
        /
      </span>
      <Link
        href={"/categories/cua-hang"}
        className={` ${
          isDetail || productName ? "text-[1.4rem]" : "text-[1.6rem]"
        } ${
          categoryParent || isDetail || productName
            ? "text-gray"
            : "font-bold text-dark"
        }`}>
        CỬA HÀNG
      </Link>

      {categoryParent && (
        <span
          className={`mx-2 opacity-35 ${
            isDetail ? "text-[1.4rem]" : "text-[1.6rem]"
          }`}>
          /
        </span>
      )}
      {categoryParent && (
        <Link
          href={`/categories/cua-hang/${categoryParent.slug}`}
          className={` ${
            categoryChild || productName ? "text-gray" : "text-dark3 font-bold"
          } ${
            isDetail || productName ? "text-[1.4rem]" : "text-[1.6rem]"
          } uppercase`}>
          {categoryParent?.name}
        </Link>
      )}

      {categoryChild && (
        <>
          <span
            className={`mx-2 opacity-35 ${
              isDetail ? "text-[1.4rem]" : "text-[1.6rem]"
            }`}>
            /
          </span>
          <span
            className={` ${
              isDetail
                ? "text-[1.4rem] text-gray uppercase"
                : "text-[1.6rem] text-dark3 font-bold"
            }`}>
            {categoryChild?.name}
          </span>
        </>
      )}
      {productName && (
        <div className="text-[1.6rem] inline-block">
          <span
            className={`mx-2 opacity-35 ${
              productName ? "text-[1.4rem]" : "text-[1.6rem]"
            }`}>
            /
          </span>
          <strong className="font-bold">
            KẾT QUẢ TÌM KIẾM CHO “{productName}”
          </strong>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
