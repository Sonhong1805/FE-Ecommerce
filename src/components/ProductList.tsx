import React from "react";
import ProductItem from "./ProductItem";

type TProductListProps = {
  productList: TProduct[];
  isSwiper: boolean;
};

const ProductList = ({ productList, isSwiper }: TProductListProps) => {
  return (
    <>
      {productList?.map((product: TProduct) => {
        return (
          <ProductItem key={product.id} item={product} isSwiper={isSwiper} />
        );
      })}
    </>
  );
};

export default ProductList;
