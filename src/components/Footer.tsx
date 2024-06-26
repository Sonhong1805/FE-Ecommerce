"use client";
import { useAppSelector } from "@/lib/hooks";
import { TCategories, TCategoriesChild } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const categoryData = useAppSelector((state) => state.categories.categoryList);
  const categoryList = categoryData?.data?.categories;

  return (
    <div className="pt-[6rem] bg-white2">
      <section className="bg-primary py-[2rem]">
        <div className="container flex text-white">
          <div className="pr-[1rem] col-3">
            <h3 className="text-[1.5rem] mb-[0.75rem] font-bold">
              LIÊN HỆ VỚI MONA
            </h3>
            <ul className="text-white1 text-[1.2rem] ">
              <li>Trung tâm hỗ trợ</li>
              <li>Thanh toán</li>
              <li>Hướng dẫn đặt hàng</li>
              <li>Giao hàng & Nhận hàng</li>
              <li>Chính sách hàng nhập khẩu</li>
              <li>Hướng dẫn đổi trả hàng</li>
              <li>Hướng dẫn và điều kiện sử dụng voucher</li>
            </ul>
          </div>
          <div className="pr-[1rem] col-3">
            <h3 className="text-[1.5rem] mb-[0.75rem] font-bold">
              MONA VIỆT NAM
            </h3>
            <ul className="text-white1 text-[1.2rem] ">
              <li>Về Mona Việt Nam</li>
              <li>Bán hàng cùng Mona</li>
              <li>Chương trình Mona Afﬁliate</li>
              <li>Tuyển dụng</li>
              <li>Điều khoản mua bán hàng hóa</li>
              <li>Chính sách bảo mật</li>
              <li>Báo chí</li>
              <li>Thương hiệu tại Mona</li>
              <li>Danh mục sản phẩm</li>
              <li>Quy chế quản lý hoạt động</li>
              <li>Redmart</li>
            </ul>
          </div>
          <div className="pr-[1rem] col-6">
            <h3 className="text-[1.5rem] mb-[0.75rem] font-bold">
              ĐĂNG KÝ NHẬN TIN TỪ MONA
            </h3>
            <div className="flex  items-center justify-between">
              <Link
                href={"/signup"}
                className="flex items-center h-[4rem] px-[2rem] text-[1.6rem] uppercase bg-secondary ">
                Đăng ký
              </Link>
              <div className="flex gap-[1.5rem]">
                <Image
                  src={"/images/app-store.png"}
                  width={135}
                  height={46}
                  style={{ width: "13.5rem", height: "4.6rem" }}
                  alt=""
                />
                <Image
                  src={"/images/play-store.png"}
                  width={135}
                  height={46}
                  style={{ width: "13.5rem", height: "4.6rem" }}
                  alt=""
                />
              </div>
            </div>
            <div className="py-[1rem]">
              <ul className="text-white1 text-[1.2rem] mb-[2rem]">
                <li>CÔNG TY TNHH RECESS</li>
                <li>
                  Giấy CNĐKDN: 0308808576 – Ngày cấp: 06/5/2009, được sửa đổi
                  lần thứ 15 ngày 24/7/2017.{" "}
                </li>
                <li>
                  Cơ quan cấp: Phòng Đăng ký kinh doanh – Sở kế hoạch và Đầu tư
                  TP.HCM{" "}
                </li>
                <li>
                  Địa chỉ đăng ký kinh doanh: Tầng 19, Tòa nhà Saigon Centre –
                  Tháp 2, 67 Lê Lợi, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh,
                  Việt Nam.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-[3rem]">
        <div className="container flex">
          <div className="col-6">
            <h3 className="text-[1.75rem] mb-[0.9rem] font-bold">
              CÁCH THỨC THANH TOÁN
            </h3>
            <ul className="flex items-center ">
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-cash.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-credit.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-installment.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-momo.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-napas.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
              <li className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/payment/method-zalopay.webp"}
                  width={60}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div className="col-3">
            <h3 className="text-[1.75rem] mb-[0.9rem] font-bold">
              DỊCH VỤ GIAO HÀNG
            </h3>
            <div>
              <Image
                src="/images/giao-hang.png"
                width={285}
                height={255}
                sizes="(max-width: 28.5rem) 100vw, 28.5rem"
                style={{ width: "auto", height: "auto" }}
                alt=""
                priority
              />
            </div>
          </div>
          <div className="col-3">
            <h3 className="text-[1.75rem] mb-[0.9rem] font-bold">CHỨNG NHẬN</h3>
            <div className="flex">
              <div className="px-[1.5rem] pb-[3rem]">
                <Image
                  src={"/images/seal_80_mar2016.png"}
                  width={80}
                  height={80}
                  style={{ width: "auto", height: "auto" }}
                  alt=""
                />
              </div>
              <ul className="px-[1.5rem] pb-[3rem]">
                <li>
                  <Image
                    src={"/images/registered.png"}
                    width={107}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                    alt=""
                  />
                </li>
                <li>
                  <Image
                    src={"/images/announced.png"}
                    width={107}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                    alt=""
                  />
                </li>
                <li>
                  <Image
                    src={"/images/registered.png"}
                    width={107}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white2 py-[3rem]">
        <div className="container flex">
          <div className="col-3 pr-[3rem] text-[1.2rem]">
            <h3 className="text-[1.5rem] mb-[0.75rem] font-bold">
              LIÊN HỆ VỚI MONA
            </h3>
            <p className="mb-[2rem]">
              Mua hàng trực tuyến (mua hàng online)mang lại sự tiện lợi, lựa
              chọn đa dạng hơn và các dịch vụ tốt hơn cho người tiêu dùng, thế
              nhưng người tiêu dùng Việt Nam vẫn chưa tận hưởng được những tiện
              ích đó. Chính vì vậy Mona Việt Nam được triển khai với mong muốn
              trở thành trung tâm mua sắm trực tuyến số 1 tại Việt Nam, nơi bạn
              có thể chọn lựa mọi thứ, từ các mặt hàng điện tử như laptop, điện
              thoại di động giá rẻ, thiết bị gia dụng như máy lạnh, máy lọc
              không khí, máy hút bụi mini gia đình, nội thất phòng ngủ… Chúng
              tôi có tất cả!
            </p>
            <p className="mb-[2rem]">
              Tại Mona.vn bạn có thể mua đồ điện tử giá rẻ, cũng như các loại
              mặt hàng khác với rất nhiều các chương trình khuyến mãi hàng
              tháng. Ngoài ra bạn cũng có thể tham gia{" "}
            </p>
          </div>
          <div className="col-3 pr-[3rem] text-[1.2rem]">
            <p className="mb-[2rem]">
              bán hàng trực tuyến thông qua hệ thống marketplace của Mona với
              rất nhiều hỗ trợ và dịch vụ hấp dẫn. Bây giờ bạn có thể trải
              nghiệm mua hàng online thỏa thích mà Mona mang lại chỉ với 1 click
              chuột. Dù bạn là một nhà quản lý bận rộn với công việc hay là
              người nội trợ với danh sách dài việc phải làm, chắc chắn bạn cũng
              sẽ yêu thích trải nghiệm mua hàng tại Mona Việt Nam - mua hàng
              trực tuyến dễ dàng hơn, thuận tiện hơn và tiết kiệm thời gian.
            </p>
            <p>
              Bạn muốn bán hàng trực tuyến online trên Mona? Hãy đăng ký tại
              đây: Mona Marketplace
            </p>
          </div>
          <div className="col-3 pr-[3rem] text-[1.2rem]">
            <h3 className="text-[1.5rem] mb-[0.75rem] font-bold">
              SẢN PHẨM NỔI BẬT
            </h3>
            {categoryList?.length &&
              categoryList.slice(0, 2).map((category: TCategories) => {
                return (
                  <div key={category.id} className="my-[1rem]">
                    <Link
                      href={`/categories/cua-hang/${category.slug}`}
                      className="text-[1.4rem] uppercase block mb-[1.2rem] hover:text-cyan">
                      {category.name}
                    </Link>
                    <ul className="inline-flex flex-wrap gap-[0.4rem]">
                      {category.children.map((child: TCategoriesChild) => {
                        return (
                          <li key={child.id}>
                            <Link
                              href={`/categories/cua-hang/${category.slug}/${child.slug}`}
                              className="hover:text-secondary">
                              {child.name} |
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
          <div className="col-3 pr-[3rem] text-[1.2rem]">
            {categoryList?.length &&
              categoryList.slice(2, 5).map((category: TCategories) => {
                return (
                  <div key={category.id} className="my-[1rem]">
                    <Link
                      href={`/categories/cua-hang/${category.slug}`}
                      className="text-[1.4rem] uppercase block mb-[1.2rem] hover:text-cyan">
                      {category.name}
                    </Link>
                    <ul className="inline-flex flex-wrap gap-[0.4rem]">
                      {category.children.map((child: TCategoriesChild) => {
                        return (
                          <li key={child.id}>
                            <Link
                              href={`/categories/cua-hang/${category.slug}/${child.slug}`}
                              className="hover:text-secondary">
                              {child.name} |
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section>
        <div className="text-center font-bold py-[0.5rem] ">
          Design by Nguyễn Hồng Sơn - 2024
        </div>
      </section>
    </div>
  );
};

export default Footer;
