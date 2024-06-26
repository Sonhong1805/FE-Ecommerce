"use client";
import Image from "next/image";
import { FaRegCircle } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { methodsPayment } from "@/constants/methodsPayment";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import groupItems from "@/helpers/groupItems";
import getTime from "@/helpers/getTime";
import randomId from "@/helpers/randomId";
import { getToken } from "@/helpers/common";
import { addToOrdered } from "@/lib/features/ordered/orderedThunk";
import Swal from "sweetalert2";
import { fetchPaid } from "@/lib/features/payment/paymentThunk";
import { handleDeleteItems } from "@/lib/features/payment/paymentSlice";
import { removeItemsCart } from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import getEstimatedTime from "@/helpers/getEstimatedTime";
import { handleAddItemToOrdered } from "@/lib/features/ordered/orderedSlice";

const MethodsPayment = () => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const router = useRouter();
  const [isShowMethodPayment, setIsShowMethodPayment] =
    useState<boolean>(false);
  const methodsContainerRef = useRef<HTMLDivElement>(null);
  const [methodPaymentArr, setMethodPaymentArr] =
    useState<IMethodPayment[]>(methodsPayment);
  const [previousStatus, setPreviousStatus] = useState<
    IMethodPayment | undefined
  >(undefined);
  const [titleMethod, setTitleMethod] = useState<string | undefined>(
    "Thẻ tín dụng/Thẻ ghi nợ"
  );

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const paymentItems = useAppSelector((state) => state.payment.paymentItems);
  const groupedPayment = groupItems(paymentItems);

  useEffect(() => {
    const handleShowMethods = (event: MouseEvent) => {
      if (
        isShowMethodPayment &&
        methodsContainerRef.current &&
        !methodsContainerRef.current.contains(event.target as Node)
      ) {
        setIsShowMethodPayment(false);
      }
    };
    document.addEventListener("click", handleShowMethods);

    return () => document.removeEventListener("click", handleShowMethods);
  }, [isShowMethodPayment]);

  const handleClickMethodPayment = (value: string) => {
    const prevStatus = methodPaymentArr.find((method) => method.status);
    setPreviousStatus(prevStatus);
    const methodPaymentWithoutStatus = methodPaymentArr.map((method) => {
      delete method.status;
      return method;
    });

    const currentMethodPayment = methodPaymentWithoutStatus.find(
      (method) => method.value === value
    );
    if (currentMethodPayment) {
      currentMethodPayment.status = true;
      const updatedMethodPaymentArr = methodPaymentWithoutStatus.map((method) =>
        method.value === currentMethodPayment.value
          ? currentMethodPayment
          : method
      );

      setMethodPaymentArr(updatedMethodPaymentArr);
      setIsShowMethodPayment(false);
    }
  };
  const [methodsMain, setMethodsMain] =
    useState<[IMethodPayment | undefined, IMethodPayment]>();

  useEffect(() => {
    const nextStatus = methodPaymentArr.find((method) => method.status);
    setMethodsMain([nextStatus, previousStatus || methodsPayment[4]]);
    setTitleMethod(nextStatus?.title);
  }, [methodPaymentArr, previousStatus]);

  const handleMethodPaymentMain = (value: string | undefined) => {
    const methodPaymentWithoutStatus = methodsMain?.map((method) => {
      delete method?.status;
      return method;
    });

    const currentMethodPayment = methodPaymentWithoutStatus?.find(
      (method) => method?.value === value
    );

    if (currentMethodPayment) {
      currentMethodPayment.status = true;
      const updatedMethodPaymentMain = methodPaymentWithoutStatus?.map(
        (method) =>
          method?.value === currentMethodPayment.value
            ? currentMethodPayment
            : method
      );
      if (updatedMethodPaymentMain) {
        const [first, last] = updatedMethodPaymentMain;
        setMethodsMain([first!, last!]);
      }
    }
  };

  useEffect(() => {
    const totalPrice = paymentItems?.reduce(
      (a: number, b: TCart) => (a += b.newPrice),
      0
    );
    setTotalPrice(totalPrice);
  }, [paymentItems]);

  const handleGetTitleMethod = (title: string | undefined) => {
    setTitleMethod(title);
  };

  const addressItems = useAppSelector((state) => state.user.addressItems);

  const handleConfirmPayment = async () => {
    if (!addressItems?.length) return;
    const addressDefault = addressItems.find(
      (address: TUserAddress) => address.isDefault
    );
    const dataOrdered = groupedPayment.map((item: any) => ({
      id: randomId(),
      ...item,
      address: addressDefault,
      method: titleMethod,
      orderTime: getTime(),
      estimatedTime: getEstimatedTime(),
    }));
    const paymentIds = paymentItems.map((item: TCart) => item.id);
    if (token) {
      const result = await dispatch(
        addToOrdered({ dataOrdered, token })
      ).unwrap();
      if (result.status === "success") {
        await dispatch(handleAddItemToOrdered(dataOrdered));
        await dispatch(fetchPaid({ paymentIds, token }));
        await dispatch(handleDeleteItems(paymentIds));
        await dispatch(removeItemsCart(paymentIds));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Bạn đã mua hàng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push("/cart");
        }, 1300);
      }
    }
  };

  return (
    <>
      <aside className="w-[38.8rem] bg-white px-[1.4rem] py-[1.6rem]">
        <div className="mb-[1.4rem] flex items-center justify-between">
          <span className="text-[1.8rem]">Chọn phương thức thanh toán</span>
          <p
            className="flex items-center text-cyan text-[1.4rem] cursor-pointer"
            onClick={() => setIsShowMethodPayment(true)}>
            <span>Xem tất cả </span>
            <MdOutlineKeyboardArrowRight className="text-[1.8rem]" />
          </p>
        </div>
        <div className="pb-[1.6rem]">
          {methodsMain?.map((method) => (
            <div key={method?.value}>
              <input
                type="radio"
                name="method-payment-main"
                id={method?.value}
                value={method?.value}
                onChange={() => {
                  handleMethodPaymentMain(method?.value),
                    handleGetTitleMethod(method?.title);
                }}
                hidden
              />
              <label
                htmlFor={method?.value}
                className={`border border-solid block ${
                  method?.status ? "border-cyan" : "border-gray2"
                }  rounded-[0.4rem] mb-[1rem]`}>
                {method && (
                  <div className="flex items-center justify-between p-[1.2rem] border-b border-solid border-gray2">
                    <Image
                      src={method.logo}
                      alt={method.value}
                      width={28}
                      height={28}
                      priority
                    />
                    <p className="flex-1 ml-[0.8rem] text-[1.4rem]">
                      {method.title}
                    </p>
                    {method?.status ? (
                      <FaCheckCircle className="text-cyan size-[1.8rem]" />
                    ) : (
                      <FaRegCircle className="text-gray2 size-[1.8rem]" />
                    )}
                  </div>
                )}
                <div className="py-[0.6rem] px-[1.2rem] text-[1.2rem] text-gray3">
                  {method?.subtitle}
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="py-[0.8rem]">
          <p className="text-[1.8em] mb-[1.4rem]">Mã giảm giá</p>
          <div className="flex ">
            <input
              className="text-[1.4rem] h-[3.8rem] px-[0.9rem] w-full mr-[0.8rem] border border-solid border-gray2 outline-none"
              placeholder="Mã giảm giá"
            />
            <button className="bg-cyan text-white flex items-center justify-center text-[1.6rem] uppercase px-[1.5rem] whitespace-nowrap">
              Áp dụng
            </button>
          </div>
        </div>
        <div className="pb-[1.6rem] border-b border-solid border-gray2">
          <div className="text-[1.8rem] mb-[1.4rem]">Thông tin đơn hàng</div>
          <div className="flex items-center justify-between mb-[1.6rem]">
            <div className="text-[1.4rem] text-gray">
              Tạm tính ({paymentItems?.length} Sản phẩm)
            </div>
            <div className="text-[1.6rem]">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[1.4rem] text-gray">Phí vận chuyển</div>
            <div className="text-[1.6rem]">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(groupedPayment?.length * 15000)}
            </div>
          </div>
        </div>
        <div className="pt-[1.4rem]">
          <div className="flex justify-between mb-[1.6rem]">
            <div className="text-[1.4rem]">Tổng cộng:</div>
            <div className="text-[1.8rem] text-secondary">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice + groupedPayment?.length * 15000)}
            </div>
          </div>
          <button
            onClick={handleConfirmPayment}
            className={`${
              addressItems?.length ? "bg-orange " : "bg-gray2 cursor-no-drop"
            } h-[4rem] text-[1.4rem] text-white w-full rounded-[0.2rem] `}>
            ĐẶT HÀNG
          </button>
        </div>
      </aside>
      <div
        className={`overlay ${
          isShowMethodPayment ? "opacity-visible" : "opacity-invisible"
        }`}></div>
      <div
        ref={methodsContainerRef}
        className={`fixed top-0 right-0 bottom-0 z-[9999] translate-transition bg-white w-[50rem] h-screen overflow-auto ${
          isShowMethodPayment ? "" : "translate-x-full"
        }`}>
        <div className="h-[8rem] py-[2.2rem] px-[2.4rem] flex items-baseline justify-between text-[2.1rem]">
          <span>Chọn phương thức thanh toán</span>
          <AiOutlineClose
            className="text-[2.5rem] text-gray cursor-pointer"
            onClick={() => setIsShowMethodPayment(false)}
          />
        </div>
        <div className="py-[3.2rem] px-[2.4rem]">
          <div className="text-[1.4rem] mb-[1.6rem]">
            Tất cả phương thức thanh toán
          </div>
          <div className="">
            {methodPaymentArr.map((method) => (
              <div
                key={method.value}
                className={`w-full border mb-[1.6rem] border-solid cursor-pointer ${
                  method.status ? "border-cyan" : "border-gray2"
                }  rounded-[0.4rem] p-[1.6rem] flex items-center justify-between`}
                onClick={() => handleClickMethodPayment(method.value)}>
                <Image
                  src={method.logo}
                  alt={method.title}
                  width={32}
                  height={32}
                  style={{ width: 32, height: 32 }}
                />
                <div className="flex-1 ml-[1.6rem] text-[1.4rem]">
                  <p className="font-bold">{method.title}</p>
                  <p className="text-gray3 mt-[1.2rem]">{method.subtitle}</p>
                </div>
                {method.status ? (
                  <FaCheckCircle className="text-cyan size-[1.8rem]" />
                ) : (
                  <FaRegCircle className="text-gray2 size-[1.8rem]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MethodsPayment;
