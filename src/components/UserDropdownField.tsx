"use client";
import React, { useEffect } from "react";
import { TiArrowUnsorted } from "react-icons/ti";

type TProps = {
  label: string;
  items: string[];
  setItem: React.Dispatch<React.SetStateAction<string | undefined>>;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: any;
  minWidth: number;
};

const UserDropdownField = (props: TProps) => {
  const {
    label,
    items,
    setItem,
    isShowModal,
    setIsShowModal,
    modalRef,
    minWidth,
  } = props;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsShowModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [modalRef, setIsShowModal]);

  return (
    <div
      ref={modalRef}
      onClick={() => setIsShowModal(!isShowModal)}
      className={`flex items-center border border-solid border-gray2 cursor-pointer px-[0.8rem]  h-[4rem] relative`}
      style={{ minWidth: `${minWidth}rem` }}>
      <div className="flex justify-between items-center flex-1">
        <span className="text-[1.4rem]">{label}</span>
        <TiArrowUnsorted className="text-[1.6rem] text-gray" />
      </div>
      {isShowModal && (
        <ul
          className={`absolute top-full py-[1.2rem] left-0 bg-white border border-solid border-gray2 max-h-[16rem] overflow-auto shadow4`}
          style={{ minWidth: `${minWidth}rem` }}>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => setItem(item)}
              className="text-[1.4rem] min-h-[2.8rem] flex items-center px-[2rem] hover:bg-gray6">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDropdownField;
