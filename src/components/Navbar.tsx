"use client";
import { fetchCategories } from "@/lib/features/categories/categoriesThunk";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TCategories } from "@/types/categories";
import Link from "next/link";
import React, { useEffect } from "react";

const Navbar = () => {
  const categoryData = useAppSelector((state) => state.categories.categoryList);
  const categoryList = categoryData.data?.categories;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <nav className="bg-primary sticky top-[10.86rem] left-0 right-0 z-[9998]">
      <ul className="container flex items-center justify-center flex-wrap">
        {categoryList?.slice(0, 11)?.map((category: TCategories) => {
          return (
            <li
              key={category.id}
              className="cursor-pointer relative hover:bg-white group">
              <Link
                href={`/categories/cua-hang/${category.slug}`}
                className="text-white group-last:text-secondary p-[1rem] block text-[1.12rem] font-bold border-b-[0.3rem] border-solid border-transparent group-hover:text-black group-hover:border-secondary  ">
                {category.name}
              </Link>
              <ul className="submenu z-[999]">
                {category.children.map((child) => (
                  <li className="submenu-item" key={child.id}>
                    <Link
                      href={`/categories/cua-hang/${category.slug}/${child.slug}`}
                      className="w-full block">
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
