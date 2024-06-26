"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ReactPaginate from "react-paginate";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type TPaginationProps = {
  itemsPerPage: number;
  productList: TProduct[];
  onHandleGetProductLength: (arg0: number) => void;
};

const Pagination = ({
  itemsPerPage,
  productList,
  onHandleGetProductLength,
}: TPaginationProps) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const validItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;

  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(0);
  }, [productList]);

  const endOffset = itemOffset + validItemsPerPage;
  const currentItems = productList?.slice(itemOffset, endOffset);

  const validProductListLength = Array.isArray(productList)
    ? productList.length
    : 0;

  const pageCount = Math.ceil(validProductListLength / validItemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * validItemsPerPage) % validProductListLength;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    if (currentItems) {
      onHandleGetProductLength(currentItems.length);
    }
  }, [currentItems, onHandleGetProductLength]);

  return (
    <>
      <div className="grid grid-cols-4">
        <ProductList productList={currentItems} isSwiper={false} />
      </div>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={currentPage === 0 ? null : <GoChevronLeft />}
        nextLabel={currentPage === pageCount - 1 ? null : <GoChevronRight />}
        className="flex justify-center items-center gap-2"
        pageClassName="pagination"
        activeClassName="active"
        previousClassName={currentPage === 0 ? "hidden" : "pagination"}
        nextClassName={currentPage === pageCount - 1 ? "hidden" : "pagination"}
        breakClassName="text-[2.4rem]"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
