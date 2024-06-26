"use client";
import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProductsDetail } from "@/lib/features/productDetail/productDetailThunk";
import { TCategories, TCategoriesChild } from "@/types/categories";
import Breadcrumb from "@/components/Breadcrumb";
import { getToken } from "@/helpers/common";
import { useRouter } from "next/navigation";
import { fetchCart } from "@/lib/features/cart/cartThunk";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import randomId from "@/helpers/randomId";
import {
  addToFavourites,
  deleteOne,
} from "@/lib/features/favourites/favouritesThunk";
import { ratingDescriptions } from "@/constants/ratingsDescriptions";
import getTime from "@/helpers/getTime";
import { addToEvaluates } from "@/lib/features/user/userThunk";
import {
  handleAddToEvaluates,
  handleInitialEvaluates,
} from "@/lib/features/products/productsSlice";
import ProductList from "@/components/ProductList";
import getSlugFromURL from "@/helpers/getSlugFromURL";
import { changedInputsChecked } from "@/lib/features/cart/cartSlice";

const MySwal = withReactContent(Swal);

const ProductDetail = ({
  params: { categorySlug, detail },
}: {
  params: { categorySlug: string; detail: string };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = getToken();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const objDetail = useAppSelector((state) => state.productDetail.detail);

  const evaluateItems = useAppSelector((state) => state.products.evaluateItems);

  const userLoggedIn = useAppSelector((state) => state.user.userLoggedIn);
  const currentUser = userLoggedIn?.data?.user;

  const [selectedInput, setSelectedInput] = useState<Record<string, string>>(
    {}
  );
  const [statusHeart, setStatusHeart] = useState<boolean>(false);

  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(5);

  const allProduct = useAppSelector((state) => state.products.allProduct);

  const [productRelated, setProductRelated] = useState<TProduct[]>([]);

  useEffect(() => {
    dispatch(fetchProductsDetail(getSlugFromURL(detail)));
  }, [dispatch, detail]);

  useEffect(() => {
    dispatch(handleInitialEvaluates(objDetail?.evaluates));
    const filterRelated = allProduct.filter(
      (product: TProduct) =>
        product.slugCategoryParent === objDetail?.slugCategoryParent &&
        product.slug !== detail
    );
    setProductRelated(filterRelated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objDetail]);

  useEffect(() => {
    if (objDetail) {
      const newObj: { [key: string]: any } = {};
      objDetail.type?.forEach((type: any) => {
        if (type.slug && type.value && type.value.length > 0) {
          newObj[type.slug] = type.value[0].name;
        }
      });
      setSelectedInput(newObj);
    }
  }, [objDetail]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(parseInt(e.target.value));
    }
  };

  const handleMainSlideChange = (swiper: any) => {
    if (thumbsSwiper && mainSwiper) {
      mainSwiper.slideTo(swiper.activeIndex);
    }
  };

  const categoryData = useAppSelector((state) => state.categories.categoryList);
  const categoryList = categoryData?.data?.categories;

  const categoryParent = categoryList?.find((category: TCategories) => {
    return category.children.some((child) => child.slug === categorySlug);
  });
  const categoryChild = categoryParent?.children.find(
    (category: TCategoriesChild) => {
      return category.slug === categorySlug;
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedInput({
      ...selectedInput,
      [name]: value,
    });
  };

  const handleAddToCart = async () => {
    if (!token) {
      router.push("/login");
    } else {
      const firstChoice = selectedInput[Object.keys(selectedInput)[0]];
      const secondChoice = selectedInput[Object.keys(selectedInput)[1]];
      const { name, slug, slugCategoryChildren } = objDetail;
      const dataCart = {
        id: randomId(),
        name,
        image: objDetail?.images[0],
        slug,
        slugCategoryChildren,
        price: objDetail?.price,
        discount: objDetail?.discount,
        quantity,
        firstChoice,
        secondChoice,
        status: false,
      };

      if (token) {
        const result = await dispatch(fetchCart({ dataCart, token })).unwrap();
        if (result.status === "success") {
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Thêm vào giỏ hàng thành công !!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  const handleBuyNow = async () => {
    if (!token) {
      router.push("/login");
    } else {
      const firstChoice = selectedInput[Object.keys(selectedInput)[0]];
      const secondChoice = selectedInput[Object.keys(selectedInput)[1]];
      const { name, slug, slugCategoryChildren } = objDetail;
      const dataCart = {
        id: randomId(),
        name,
        image: objDetail?.images[0],
        slug,
        slugCategoryChildren,
        price: objDetail?.price,
        discount: objDetail?.discount,
        quantity,
        firstChoice,
        secondChoice,
        status: true,
      };

      if (token) {
        const result = await dispatch(fetchCart({ dataCart, token })).unwrap();
        if (result.status === "success") {
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Thêm vào giỏ hàng thành công !!!",
            showConfirmButton: false,
            timer: 1500,
          });
          await dispatch(changedInputsChecked(dataCart));
          router.push("/cart");
        }
      }
    }
  };

  const favouritesItems = useAppSelector(
    (state) => state.favourites.favouritesItems
  );

  useEffect(() => {
    const name = objDetail?.name;
    const firstChoice = selectedInput[Object.keys(selectedInput)[0]];
    const secondChoice = selectedInput[Object.keys(selectedInput)[1]];

    const exitsFavourite = favouritesItems.some(
      (item: TCart) =>
        item.name === name &&
        item.firstChoice === firstChoice &&
        item.secondChoice === secondChoice
    );
    setStatusHeart(exitsFavourite);
  }, [selectedInput, objDetail, favouritesItems]);

  const handleAddFavourite = async () => {
    if (!token) {
      router.push("/login");
    } else {
      const firstChoice = selectedInput[Object.keys(selectedInput)[0]];
      const secondChoice = selectedInput[Object.keys(selectedInput)[1]];
      const { name, slug, slugCategoryChildren } = objDetail;
      const currentPrice = Math.round(
        objDetail?.price - (objDetail?.price * objDetail?.discount) / 100
      );
      const dataFavourites = {
        id: randomId(),
        name,
        image: objDetail?.images[0],
        slug,
        slugCategoryChildren,
        currentPrice,
        discount: objDetail?.discount,
        firstChoice,
        secondChoice,
        status: false,
      };
      await dispatch(addToFavourites({ dataFavourites, token })).unwrap();
    }
  };

  const handleDeleteFavourite = async () => {
    const name = objDetail.name;
    const firstChoice = selectedInput[Object.keys(selectedInput)[0]];
    const secondChoice = selectedInput[Object.keys(selectedInput)[1]];
    const currrentFavourite = favouritesItems.find(
      (item: TCart) =>
        item.name === name &&
        item.firstChoice === firstChoice &&
        item.secondChoice === secondChoice
    );
    if (token) {
      await dispatch(deleteOne({ id: currrentFavourite.id, token }));
    }
  };

  const contentEvaluateRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmitEvaluation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataEvaluates: TEvaluates = {
      slug: objDetail.slug,
      slugCategoryChildren: objDetail.slugCategoryChildren,
      image: objDetail.images[0],
      name: objDetail.name,
      username: currentUser.username,
      star: selectedRating,
      content: contentEvaluateRef.current?.value || "",
      time: getTime(),
    };
    if (token) {
      const response = await dispatch(
        addToEvaluates({ dataEvaluates, token })
      ).unwrap();
      if (response.status === "success") {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Đánh giá thành công !!!",
          showConfirmButton: false,
          timer: 1000,
        });
        await dispatch(handleAddToEvaluates(dataEvaluates));
        setSelectedRating(5);
        if (contentEvaluateRef.current) {
          contentEvaluateRef.current.value = "";
        }
      }
    }
  };

  return !objDetail.id ? (
    <div className="loader fixed">
      <div className="spinner"></div>
    </div>
  ) : (
    <main>
      <div className="container py-16">
        <div className="flex">
          <div className="col-5 p-[2.4rem]">
            {objDetail?.images?.length >= 1 && (
              <Swiper
                loop={objDetail?.images?.length >= 2}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 relative"
                onSlideChange={handleMainSlideChange}>
                {objDetail?.images?.map((image: string, index: number) => (
                  <SwiperSlide key={index} onClick={() => setIsShowModal(true)}>
                    <Image
                      alt=""
                      width={372}
                      height={372}
                      src={image}
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {objDetail?.images?.length >= 5 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={objDetail?.images?.length >= 5}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper">
                {objDetail?.images?.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      alt=""
                      width={372}
                      height={372}
                      src={image}
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="col-7 p-[2.4rem]">
            <Breadcrumb
              categoryParent={categoryParent}
              categoryChild={categoryChild}
              isDetail={detail}
            />
            <h2 className="text-[3.2rem] font-bold mt-[1rem]">
              {objDetail?.name}
            </h2>
            <div className="h-[0.4rem] bg-[rgba(0,0,0,0.1)] my-[1.6rem] w-full max-w-[5rem]"></div>
            <div className="flex items-center justify-between text-[1.4rem]">
              <div className="flex items-center gap-[1.2rem]">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <GoStarFill key={index} className="text-yellow" />
                  ))}
                </div>
                <Link href={"/"} className="">
                  {objDetail?.evaluates?.length} đánh giá
                </Link>
              </div>
              {statusHeart ? (
                <button onClick={handleDeleteFavourite}>
                  <FaHeart className="text-[2rem]" />
                </button>
              ) : (
                <button onClick={handleAddFavourite}>
                  <FaRegHeart className="text-[2rem]" />
                </button>
              )}
            </div>
            <div className="my-[1rem]">
              <strong className="text-[2.6rem] text-secondary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  Math.round(
                    objDetail?.price -
                      (objDetail?.price * objDetail?.discount) / 100
                  )
                )}
              </strong>
              {objDetail?.discount !== 0 && (
                <div className="text-[1.6rem]">
                  <span className="line-through text-gray mr-[1rem]">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(objDetail?.price)}
                  </span>
                  <span className="">-{objDetail?.discount}%</span>
                </div>
              )}
            </div>
            {objDetail?.type?.map((item: TProductType) => (
              <div className="flex mb-[1rem]" key={item.slug}>
                <div className="text-[1.4rem] text-gray mr-[1rem] min-w-[10rem]">
                  {item.name}
                </div>
                <div className="">
                  <div className="text-[1.4rem]">
                    {selectedInput[item.slug]}
                  </div>
                  <div className="my-[1rem] flex gap-y-[2.1rem] gap-x-[0.8rem] flex-wrap">
                    {item.value?.map((child) => (
                      <div key={child.slug}>
                        <input
                          type="radio"
                          id={child.slug}
                          name={item.slug}
                          value={child.name}
                          data-type1
                          hidden
                          defaultChecked={item.value[0].slug === child.slug}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={child.slug}
                          className="border border-solid border-gray2 text-[1.2rem] min-w-[4.8rem] p-[0.8rem] cursor-pointer noselect">
                          {child.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <div className="text-[1.4rem] text-gray mr-[1rem] min-w-[10rem]">
                Số lượng
              </div>
              <div className="flex">
                <button
                  onClick={handleDecreaseQuantity}
                  className="size-[3.6rem] flex justify-center items-center text-[1.6rem] bg-white3 border border-solid border-gray2">
                  &#8722;
                </button>
                <input
                  className="size-[3.6rem] text-center text-[1.4rem] border border-solid border-gray2 shadow3 outline-none"
                  value={quantity}
                  onChange={handleInputQuantity}
                />
                <button
                  onClick={handleIncreaseQuantity}
                  className="size-[3.6rem] flex justify-center items-center text-[1.6rem] bg-white3 border border-solid border-gray2">
                  &#43;
                </button>
              </div>
            </div>
            <div className="my-[1.8rem]">
              <button
                onClick={handleAddToCart}
                className="text-white text-[1.6rem] bg-secondary font-bold p-[1rem] mr-[1rem]">
                Thêm vào giỏ
              </button>
              <button
                onClick={handleBuyNow}
                className="text-white text-[1.6rem] bg-secondary font-bold p-[1rem]">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
        <div className="p-12">
          <h2 className="text-[2.1rem] text-dark font-bold mb-[0.8rem]">
            Mô tả
          </h2>
          <div className="w-full border-2 border-solid border-gray p-[1.5rem]">
            <ul className="list-disc pl-[1.5rem]">
              {objDetail?.descriptions?.map(
                (description: string, index: number) => (
                  <li className="text-[1.6rem] mb-[0.8rem]" key={index}>
                    {description}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="p-12">
          <form
            className="p-6 border-2 border-solid border-secondary"
            onSubmit={handleSubmitEvaluation}>
            <h2 className="text-[2.1rem] text-dark font-bold mb-[0.8rem]">
              Viết nhận xét
            </h2>
            <p className="text-[1.2rem] mt-[1.3rem] mb-[1.7rem]">
              Nhận xét và đánh giá sản phẩm đã mua (5 sao: Rất Tốt - 1 sao: Rất
              Tệ):
            </p>
            <div className="flex items-center mb-[1rem]">
              <h3 className="text-[1.6rem] text-dark mr-[1rem]">
                Đánh giá của bạn
              </h3>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <Fragment key={currentRating}>
                      <label
                        htmlFor={`rate${currentRating}`}
                        title={ratingDescriptions[currentRating - 1]}
                        className="text-[3.3rem] mr-4 cursor-pointer">
                        <input
                          type="radio"
                          id={`rate${currentRating}`}
                          name="rate"
                          value={currentRating}
                          onChange={() => setSelectedRating(currentRating)}
                          hidden
                        />
                        <GoStarFill
                          color={
                            currentRating <= (hoverRating || selectedRating)
                              ? "#faca51"
                              : "rgba(102,102,102,0.7)"
                          }
                          onMouseEnter={() => setHoverRating(currentRating)}
                          onMouseLeave={() => setHoverRating(null)}
                        />
                      </label>
                    </Fragment>
                  );
                })}
              </div>
              {selectedRating && (
                <div className="text-[1.2rem]">
                  {ratingDescriptions[selectedRating - 1]}
                </div>
              )}
            </div>
            <div className="">
              <h3 className="text-[1.6rem] text-dark mr-[1rem]">
                Nhận xét của bạn
              </h3>
              <textarea
                ref={contentEvaluateRef}
                placeholder="Bạn nghĩ gì về sản phẩm này"
                className="min-h-[12rem] mb-[1.6rem] border border-solid border-gray2 text-[1.4rem] outline-none shadow3 w-2/4 p-[1rem]"></textarea>
            </div>
            <button className="text-white text-[1.6rem] bg-secondary font-bold p-[1rem]">
              Gửi đánh giá
            </button>
          </form>
        </div>
        <div className="p-12">
          <h2 className="text-[2.1rem] text-dark font-bold mb-[0.8rem]">
            Nhận xét về sản phẩm
          </h2>
          <ul>
            {evaluateItems?.map((evaluate: TEvaluates) => (
              <li className="flex mb-[2rem] gap-[1.5rem]" key={evaluate.id}>
                <figure className=" size-[6rem] contents">
                  <Image
                    alt=""
                    width={60}
                    height={60}
                    src={
                      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }
                    className="rounded-full size-[6rem]"
                  />
                </figure>
                <div>
                  <div className="flex text-[1.4rem] mb-[0.5rem]">
                    {Array.from({ length: evaluate.star }).map(
                      (_, index: number) => (
                        <GoStarFill key={index} className="text-yellow" />
                      )
                    )}
                  </div>
                  <div>
                    <strong className="text-[1.4rem]">
                      {evaluate.username}
                    </strong>
                    <span className="text-[1.4rem]"> – {evaluate.time}</span>
                  </div>
                  <p className="text-[1.4rem] break-all">{evaluate.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-12">
          <h2 className="text-[2.1rem] text-dark font-bold mb-[1.5rem]">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-4">
            <ProductList
              productList={productRelated?.slice(0, 8)}
              isSwiper={false}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-[9999] ${
          isShowModal ? "block" : "hidden"
        }`}>
        <button
          className="fixed z-[999] right-0 p-[0.5rem]"
          onClick={() => setIsShowModal(false)}>
          <IoClose className="size-[3.2rem] text-white" />
        </button>
        {objDetail?.images?.length >= 1 && (
          <Swiper
            onSwiper={setMainSwiper}
            slidesPerView={1}
            loop={false}
            zoom={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Zoom]}
            className="mySwiper3">
            {objDetail?.images?.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container cursor-zoom-in">
                  <Image alt="" width={372} height={372} src={image} priority />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
