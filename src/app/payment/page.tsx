"use client";
import "./style.scss";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";
import AddressForm from "@/components/AddressForm";
import MethodsPayment from "@/components/MethodsPayment";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Swal from "sweetalert2";
import { getToken } from "@/helpers/common";
import { deleteOne } from "@/lib/features/payment/paymentThunk";
import { handleDeleteOne } from "@/lib/features/payment/paymentSlice";
import { useEffect, useState } from "react";
import groupItems from "@/helpers/groupItems";
import DeliveryAddressInfo from "@/components/DeliveryAddressInfo";

const Payment = () => {
  const token = getToken();
  const dispatch = useAppDispatch();

  const paymentItems = useAppSelector((state) => state.payment.paymentItems);

  const groupedPayment = groupItems(paymentItems);

  const handleDeleteItemsPayment = async (id: number) => {
    const result = await Swal.fire({
      title: "Loại bỏ ở bước thanh toán?",
      text: "Bạn có đồng ý loại bỏ sản phẩm này khỏi đơn hàng?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "HUỶ",
      confirmButtonColor: "#37cfdd",
      cancelButtonColor: "#ff531d",
      confirmButtonText: "ĐỒNG Ý",
    });
    if (result.isConfirmed) {
      if (paymentItems.length === 1) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title:
            "Giỏ hàng của bạn trống! Vui lòng chọn sản phẩm trước khi thanh toán",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        if (token) {
          const response = await dispatch(deleteOne({ id, token })).unwrap();
          if (response.status === "success") {
            await dispatch(handleDeleteOne({ id }));
            Swal.fire({
              title: "Xoá thành công!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    }
  };

  const [addressDefault, setAddressDefault] = useState<TUserAddress | null>(
    null
  );

  const addressItems = useAppSelector((state) => state.user.addressItems);

  useEffect(() => {
    const currentAddressDefault = addressItems?.find(
      (address: TUserAddress) => address.isDefault
    );
    setAddressDefault(currentAddressDefault);
  }, [addressItems]);

  return (
    <main className="bg-white2">
      <div className="container pt-[1.2rem]">
        <div className="flex items-start gap-[1.2rem]">
          <div className="flex-1">
            {addressDefault ? (
              <DeliveryAddressInfo addressDefault={addressDefault} />
            ) : (
              <AddressForm
                isCreate={false}
                setShowFormModal={null}
                addressDetail={null}
              />
            )}
            <section>
              {groupedPayment?.map((group: TOrdered, index: number) => (
                <article key={group.name} className="mt-[1.2rem]">
                  <p className="text-[1.4rem] bg-gray2 pl-[1rem] py-[1rem] font-bold">
                    Gói hàng {index + 1} của {groupedPayment.length}
                  </p>
                  {group.items.map((item: TCart) => {
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between gap-[1rem] bg-white px-[1rem] py-[1.6rem] border-b border-solid border-gray2 last:border-0">
                        <Link
                          href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
                          className="pl-[1rem]">
                          <Image
                            src={item.image}
                            width={80}
                            height={80}
                            alt=""
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/product/${item.slugCategoryChildren}/${item.slug}.html`}
                            className="text-[1.6rem] line-clamp-3">
                            {item.name}
                          </Link>
                          <p className="mt-[0.8rem] text-gray text-[1.2rem]">
                            {item.firstChoice}
                            {item.secondChoice && ", " + item.secondChoice}.
                          </p>
                        </div>
                        <div className="flex-1">
                          <span className="text-[1.8rem] text-secondary">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.newPrice)}
                          </span>
                          <div className={`${!item.discount && "hidden"}`}>
                            <p className="text-gray text-[1.4rem] line-through">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.currentPrice)}
                            </p>
                            <p className="text-[1.4rem]">-{item.discount}%</p>
                          </div>
                          <br />
                          <div
                            className="inline-block"
                            onClick={() => handleDeleteItemsPayment(item.id)}>
                            <FaRegTrashCan className="size-[2rem] text-gray3 cursor-pointer" />
                          </div>
                        </div>
                        <div className="pr-[2rem]">
                          <span className="text-[1.4rem] text-gray">
                            Số lượng:{" "}
                          </span>
                          <strong className="text-[1.6rem]">
                            {item.quantity}
                          </strong>
                        </div>
                      </div>
                    );
                  })}
                </article>
              ))}
            </section>
          </div>
          <MethodsPayment />
        </div>
      </div>
    </main>
  );
};

export default Payment;
