"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import categories from "@/constants/categories";
import { useAppSelector } from "@/lib/hooks";
import ProductList from "@/components/ProductList";
import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const allProduct = useAppSelector((state) => state.products.allProduct);
  const productsFlashSale = allProduct.filter((product: TProduct) =>
    product.tags.includes("flash-sale")
  );
  const productsTopDeal = allProduct.filter((product: TProduct) =>
    product.tags.includes("top-deal")
  );
  const productsVehicle = allProduct.filter((product: TProduct) =>
    product.tags.includes("vehicle")
  );
  const productsInterior = allProduct.filter((product: TProduct) =>
    product.tags.includes("interior")
  );

  const [loadMore, setLoadMore] = useState<number>(11);
  const ONE_DAYS_IN_MS = 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterOneDays = NOW_IN_MS + ONE_DAYS_IN_MS;

  return (
    <main className="bg-white2 ">
      {!!allProduct.length || (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className="container pt-[0.5rem]">
        <section className="pb-[3rem] ">
          <div className="grid" style={{ gridTemplateColumns: "79rem 1fr" }}>
            <div>
              <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={false}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiperBanner">
                {[...Array(5)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-[79rem] h-[39rem]">
                      <Image
                        src={`/images/home/banner-chinh-hang-0${++index}.jpg`}
                        alt=""
                        fill
                        sizes="(max-width: 79rem) 100vw, 79rem"
                        style={{ objectFit: "cover" }}
                        quality={100}
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="row-start-2 flex">
              <Link href={"/categories/cua-hang"}>
                <div className="relative w-[39.5rem] h-[39.5rem]">
                  <Image
                    src="/images/home/banner-khuyen-mai-01.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 79rem) 100vw, 79rem"
                    style={{ objectFit: "cover" }}
                    quality={100}
                  />
                </div>
              </Link>
              <Link href={"/categories/cua-hang"}>
                <div className="relative w-[39.5rem] h-[39.5rem]">
                  <Image
                    src="/images/home/banner-khuyen-mai-02.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 79rem) 100vw, 79rem"
                    style={{ objectFit: "cover" }}
                    quality={100}
                  />
                </div>
              </Link>
            </div>
            <div className="h-[39rem] overflow-hidden">
              <Link href={"/categories/cua-hang"}>
                <Image
                  src="/images/home/banner-khuyen-mai-03.jpg"
                  alt=""
                  width={792}
                  height={390}
                  className="translate-y-[-17.7rem]"
                />
              </Link>
            </div>
            <div className="h-[39.5rem] overflow-hidden">
              <Link href={"/categories/cua-hang"}>
                <Image
                  src="/images/home/banner-khuyen-mai-04.jpg"
                  alt=""
                  width={792}
                  height={395}
                  className="translate-y-[-15.7rem]"
                />
              </Link>
            </div>
          </div>
        </section>
        <section className="pb-[3rem]">
          <div className="mb-[0.9rem] leading-[2.2rem] flex justify-between">
            <h3 className="text-[1.75rem] font-bold uppercase">DANH MỤC</h3>
            <Link
              href={"/categories/cua-hang"}
              className="text-[1.4rem] text-blue hover:underline">
              Xem tất cả &gt;
            </Link>
          </div>
          <div className="grid grid-cols-8 gap-x-[0.1rem] bg-gray6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/cua-hang/${category.href}`}
                className="block bg-white ">
                <figure className="text-center">
                  <Image
                    src={category.image}
                    width={75}
                    height={75}
                    alt=""
                    className="p-[1rem] m-auto"
                  />
                  <figcaption className="uppercase p-[1rem] pb-[1.76rem] text-[1.26rem] font-bold">
                    {category.name}
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </section>
        <section className="pb-[3rem]">
          <div className="h-[4.6rem] flex items-center">
            <div className="relative w-[15rem] h-[2.875rem] mr-[5rem]">
              <Image
                src={"/images/home/flash-sale.png"}
                alt=""
                fill
                sizes="(max-width: 15rem) 100vw, 15rem"
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </div>
            <CountdownTimer targetDate={dateTimeAfterOneDays} />
          </div>
          <div className="flex">
            <div>
              <Link href={"/categories/cua-hang"}>
                <Image
                  src={"/images/home/banner-flash-sale.jpg"}
                  alt=""
                  width={295}
                  height={188.13}
                  style={{ width: "29.5rem", height: "100%" }}
                  quality={100}
                />
              </Link>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiperFlashSale">
              <SwiperSlide>
                <ProductList
                  productList={productsFlashSale.slice(0, 4)}
                  isSwiper={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductList
                  productList={productsFlashSale.slice(4, 8)}
                  isSwiper={true}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className="pb-[3rem]">
          <h3 className="text-[1.75rem] mb-[0.9rem] leading-[2.2rem] font-bold">
            Deal hot trong ngày
          </h3>
          <div className="flex">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiperFlashSale">
              <SwiperSlide>
                <ProductList
                  productList={productsTopDeal.slice(0, 4)}
                  isSwiper={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductList
                  productList={productsTopDeal.slice(4, 8)}
                  isSwiper={true}
                />
              </SwiperSlide>
            </Swiper>
            <div>
              <Link href={"/categories/cua-hang"}>
                <Image
                  src={"/images/home/banner-deal.jpg"}
                  alt=""
                  width={295}
                  height={188.13}
                  style={{ width: "29.5rem", height: "100%" }}
                  quality={100}
                />
              </Link>
            </div>
          </div>
        </section>
        <section className="pb-[3rem]">
          <h3 className="text-[1.75rem] mb-[0.9rem] leading-[2.2rem] font-bold">
            Ô tô & Xe máy - Phụ kiện
          </h3>
          <div className="flex">
            <div>
              <Link href={"/categories/cua-hang/o-to-xe-may-xe-dap"}>
                <Image
                  src={"/images/home/banner-oto-xemay.jpg"}
                  alt=""
                  width={295}
                  height={188.13}
                  style={{ width: "29.5rem", height: "100%" }}
                  quality={100}
                />
              </Link>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiperFlashSale">
              <SwiperSlide>
                <ProductList
                  productList={productsVehicle.slice(0, 4)}
                  isSwiper={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductList
                  productList={productsVehicle.slice(4, 8)}
                  isSwiper={true}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className="pb-[3rem]">
          <h3 className="text-[1.75rem] mb-[0.9rem] leading-[2.2rem] font-bold">
            Nội thất thông minh
          </h3>
          <div className="flex">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiperFlashSale">
              <SwiperSlide>
                <ProductList
                  productList={productsInterior.slice(0, 4)}
                  isSwiper={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductList
                  productList={productsInterior.slice(4, 8)}
                  isSwiper={true}
                />
              </SwiperSlide>
            </Swiper>
            <div>
              <Link href={"/categories/cua-hang/nha-cua-doi-song"}>
                <Image
                  src={"/images/home/banner-noi-that.jpg"}
                  alt=""
                  width={295}
                  height={188.13}
                  style={{ width: "29.5rem", height: "100%" }}
                  quality={100}
                />
              </Link>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-[1.75rem] mb-[0.9rem] leading-[2.2rem] font-bold">
            Dành riêng cho bạn
          </h3>
          <div className="grid grid-cols-5">
            <ProductList
              productList={[...allProduct]
                .sort(() => Math.random() - Math.random())
                .slice(0, loadMore)}
              isSwiper={false}
            />
          </div>
          {loadMore === 44 ? (
            <div className="text-center text-[1.2rem] text-gray">
              Bạn đã kết thúc{" "}
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setLoadMore(loadMore + 11)}
                className="w-[38.7rem] h-[4rem] text-center text-[1.4rem] text-cyan border border-solid border-cyan font-bold uppercase">
                Tải thêm
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
