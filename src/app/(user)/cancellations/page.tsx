"use client";
import AccountNavbar from "@/components/AccountNavbar";
import { getToken } from "@/helpers/common";
import getCancellationsTime from "@/helpers/getCancellationsTime";
import randomId from "@/helpers/randomId";
import { addToCancelled } from "@/lib/features/cancellations/cancellationsThunk";
import { handleUpdateOrdered } from "@/lib/features/ordered/orderedSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IStatusItem {
  id: string;
  reason?: string;
  status: boolean;
}

const MyCancellations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = getToken();
  const [countCharacters, setCountCharacters] = useState<string>("");
  const cancelItems: TCancellations = useAppSelector(
    (state) => state.cancellations.cancelItems
  );
  const [statusItems, setStatusItems] = useState<IStatusItem[]>([]);
  const [statusAccept, setStatusAccept] = useState(false);
  const [statusButton, setStatusButton] = useState(false);

  useEffect(() => {
    if (!cancelItems.idOrdered) {
      router.push("/account");
    }
  }, [cancelItems, router]);

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    status: boolean
  ) => {
    const { value, id } = e.target;
    setStatusItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        return prev.map((item, index) =>
          index === itemIndex ? { ...item, reason: value } : item
        );
      }
      return [
        ...prev,
        {
          id,
          reason: value,
          status,
        },
      ];
    });
  };

  const handleSelectCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setStatusItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        return prev.map((item, index) =>
          index === itemIndex ? { ...item, status: checked } : item
        );
      }
      return [
        ...prev,
        {
          id,
          status: checked,
        },
      ];
    });
  };

  const handleCancellations = async () => {
    const cancelSelected = statusItems.filter(
      (item) => item.status && item.reason !== "Lựa chọn Lý do" && item.reason
    );
    const idsCancelSelected = cancelSelected.map((item) => item.id);
    const cancelArr = cancelItems.items.filter((item) =>
      idsCancelSelected.includes(item.id + "")
    );
    const dataCancellations = {
      id: randomId(),
      idOrdered: cancelItems.idOrdered,
      items: cancelArr,
      cancellationsTime: getCancellationsTime(),
    };
    if (token) {
      const response = await dispatch(
        addToCancelled({ dataCancellations, token })
      ).unwrap();
      if (response.status === "success") {
        await dispatch(handleUpdateOrdered(dataCancellations));
        router.push("/order/cancel");
      }
    }
  };

  useEffect(() => {
    const activeAndValidItems = statusItems.filter(
      (item) => item.status && item.reason && item.reason !== "Lựa chọn Lý do"
    );

    const allValid = statusItems.every(
      (item) =>
        !item.status ||
        (item.status && item.reason && item.reason !== "Lựa chọn Lý do")
    );

    if (allValid && activeAndValidItems.length > 0 && statusAccept) {
      setStatusButton(true);
    } else {
      setStatusButton(false);
    }
  }, [statusItems, statusAccept]);

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              {" "}
              Yêu cầu hủy đơn hàng
            </h1>
            <div className="bg-white mb-[1.2rem] pb-[2.4rem]">
              <p className="text-[1.6rem] pt-[2.2rem] px-[2.4rem] inline-block">
                Chọn sản phẩm bạn muốn hủy bỏ
              </p>
              <div>
                {cancelItems.items?.length &&
                  cancelItems.items?.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center pb-[2.4rem] mt-[1.2rem] mx-[3.2rem] border-b border-solid border-gray8 last:border-b-0">
                        <div className="w-[5rem]">
                          <input
                            type="checkbox"
                            name="cancellations"
                            onChange={handleSelectCheckbox}
                            id={item.id + ""}
                            className="w-[1.6rem] h-[1.6rem] accent-secondary"
                          />
                        </div>
                        <div>
                          <Image
                            src={item.image}
                            width={80}
                            height={80}
                            alt=""
                          />
                        </div>
                        <div style={{ width: "calc(100% - 56rem)" }}>
                          <span
                            className="text-[1.4rem] px-[1.2rem] line-clamp-2"
                            style={{ width: "calc(100% - 5rem)" }}>
                            {item.name}
                          </span>
                          <p
                            className="text-[1.2rem] px-[1.2rem] font-normal text-dark2"
                            style={{ width: "calc(100% - 5rem)" }}>
                            {item.firstChoice}
                            {item.secondChoice && ", " + item.secondChoice}.
                          </p>
                        </div>
                        <div className="w-[10rem] ml-[2rem] ">
                          <span className="text-[1.4rem] text-gray7 mr-[0.6rem]">
                            Qty:
                            <strong className="text-[1.6rem] text-dark font-medium">
                              {item.quantity}
                            </strong>
                          </span>
                        </div>
                        <div>
                          <select
                            name=""
                            id={item.id + ""}
                            onChange={(e) => handleSelectChange(e, item.status)}
                            defaultValue={"Lựa chọn Lý do"}
                            className={`w-[30rem] h-[3.8rem] outline-none leading-[2.6rem] text-[1.4rem] border border-solid border-gray9 pl-[0.8rem] pr-[2.5rem] rounded-[0.2rem]`}>
                            <option value="Lựa chọn Lý do" hidden>
                              Lựa chọn Lý do
                            </option>
                            <option value="Muốn thêm/xóa sản phẩm trong đơn hàng">
                              Muốn thêm/xóa sản phẩm trong đơn hàng
                            </option>
                            <option value="Nhà bán hàng yêu cầu hủy">
                              Nhà bán hàng yêu cầu hủy
                            </option>
                            <option value="Muốn thay đổi/gặp vấn đề với hình thức thanh toán">
                              Muốn thay đổi/gặp vấn đề với hình thức thanh toán
                            </option>
                            <option value="Thời gian giao hàng quá lâu">
                              Thời gian giao hàng quá lâu
                            </option>
                            <option value="Thay đổi ý">Thay đổi ý</option>
                            <option value="Trùng đơn hàng">
                              Trùng đơn hàng
                            </option>
                            <option value="Thay đổi địa chỉ giao hàng">
                              Thay đổi địa chỉ giao hàng
                            </option>
                            <option value="Tìm thấy nơi khác giá tốt hơn">
                              Tìm thấy nơi khác giá tốt hơn
                            </option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-white mb-[1.2rem] pb-[0.8rem]">
              <p className="text-[1.6rem] pt-[2.4rem] px-[2.4rem] pb-[1rem] inline-block">
                Thông tin thêm (không bắt buộc)
              </p>
              <div
                className="w-full border border-solid border-gray2 rounded-[0.2rem] my-[0.3rem] mx-[2.4rem]"
                style={{ width: "calc(100% - 4.8rem)" }}>
                <textarea
                  name=""
                  id=""
                  placeholder="Vd: Điện thoại của tôi thiếu tai nghe"
                  className="w-full text-[1.4rem] p-[1.2rem] resize-none outline-none border-none"
                  maxLength={256}
                  onChange={(e) => setCountCharacters(e.target.value)}
                  rows={4}></textarea>
              </div>
              <div className="text-right px-[2.4rem] text-[1.2rem]">
                <span className="">{countCharacters.length}</span>
                <span className="text-gray9">/256</span>
              </div>
            </div>
            <div className="bg-white mb-[2.4rem] pt-[2.4rem] pb-[2.4rem] px-[2.4rem]">
              <p className="text-[1.6rem] pb-[1rem]">Chính Sách Hủy Đơn Hàng</p>
              <div className="bg-[#f1f1f1] py-[0.1rem] px-[1rem]">
                <div className="bg-white p-[0.8rem] mt-[1rem] mb-[1.5rem]">
                  <p className="text-[1.4rem] leading-[2.5rem] ">
                    Trước khi hủy đơn hàng, vui lòng đọc kỹ điều kiện dưới đây:
                  </p>
                  <ol className="text-[1.4rem] list-decimal pl-[1.6rem]">
                    <li className="leading-[2.5rem]">
                      Khi bạn xác nhận thông tin này, bạn đã đồng ý hủy sản phẩm
                      đã chọn. Chúng tôi sẽ không thể khôi phục lại đơn hàng khi
                      đã hủy.
                    </li>
                    <li className="leading-[2.5rem]">
                      Khi bạn xác nhận hủy sản phẩm, chúng tôi sẽ hoàn tiền lại
                      cho bạn theo thời gian quy định của Lazada (1 ngày cho mã
                      giảm giá, 5-15 ngày cho thẻ tín dụng)
                    </li>
                    <li className="leading-[2.5rem]">
                      Nếu bạn chỉ hủy một trong số nhiều sản phẩm của 1 nhà bán
                      hàng, phí giao hàng sẽ không được hoàn lại.
                    </li>
                    <li className="leading-[2.5rem]">
                      Khi đơn hàng được hủy thành công, bạn sẽ nhận được thông
                      báo về khoản tiền hoàn lại.
                    </li>
                  </ol>
                </div>
                <div className="flex items-center mb-[1.2rem]">
                  <input
                    onChange={(e) => setStatusAccept(e.target.checked)}
                    checked={statusAccept}
                    type="checkbox"
                    id="accept"
                    className="size-[1.6rem] accent-secondary"
                  />
                  <label
                    htmlFor="accept"
                    className="text-[1.4rem] leading-[2.6rem] pl-[0.8rem]">
                    Tôi đã đọc và đồng ý với Chính Sách Hủy Đơn Hàng
                  </label>
                </div>
              </div>
            </div>
            <div className="h-[4.8rem] text-right ml-[2.4rem]">
              <button
                onClick={handleCancellations}
                className={`${
                  statusButton
                    ? "bg-orange pointer-events-auto"
                    : "bg-gray10 pointer-events-none"
                } text-white h-[4.8rem] px-[3.6rem] text-[1.4rem] leading-[4.6rem] rounded-[0.2rem]`}>
                XÁC NHẬN
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyCancellations;
