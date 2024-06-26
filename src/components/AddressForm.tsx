import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdWork } from "react-icons/md";
import { TiArrowUnsorted, TiHome } from "react-icons/ti";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "@/lib/features/address/addressThunk";
import { IoIosCheckmark } from "react-icons/io";
import { getToken } from "@/helpers/common";
import { useRouter } from "next/navigation";
import randomId from "@/helpers/randomId";
import { addToAddress, editAddress } from "@/lib/features/user/userThunk";
import { handleAddItemToAddress } from "@/lib/features/user/userSlice";
import { AiOutlineClose } from "react-icons/ai";

interface IErrorSetter {
  setProvinceError: (error: string) => void;
  setDistrictError: (error: string) => void;
  setWardError: (error: string) => void;
}

const schema = z.object({
  username: z
    .string()
    .nonempty({ message: "Thông tin bắt buộc" })
    .min(2, "Độ dài phải từ 2 - 50 kí tự")
    .max(50, "Độ dài phải từ 2 - 50 kí tự"),
  phoneNumber: z
    .string()
    .nonempty({ message: "Thông tin bắt buộc" })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
      message: "Nhập số điện thoại hợp lệ",
    }),
  deliveryAddress: z
    .string()
    .nonempty({ message: "Thông tin bắt buộc" })
    .min(
      5,
      "Vui lòng chỉ điền Số nhà, Tên Đường, Tên Căn hộ/Tòa Nhà/Công Ty ở đây (Chiều dài từ 5-350 ký tự)"
    )
    .max(
      350,
      "Vui lòng chỉ điền Số nhà, Tên Đường, Tên Căn hộ/Tòa Nhà/Công Ty ở đây (Chiều dài từ 5-350 ký tự)"
    ),
});

type TAddressProps = {
  isCreate: boolean;
  addressDetail: TUserAddress | null;
  setShowFormModal: React.Dispatch<React.SetStateAction<boolean>> | null;
};

const AddressForm = ({
  isCreate,
  setShowFormModal,
  addressDetail,
}: TAddressProps) => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const router = useRouter();
  const [isOpenProvinces, setIsOpenProvinces] = useState<boolean>(false);
  const [isOpenDistricts, setIsOpenDistricts] = useState<boolean>(false);
  const [isOpenWards, setIsOpenWards] = useState<boolean>(false);

  const [currentProvinces, setCurrentProvinces] = useState<TProvince | null>(
    null
  );
  const [currentDistricts, setCurrentDistricts] = useState<TDistrict | null>(
    null
  );
  const [currentWards, setCurrentWards] = useState<TWard | null>(null);

  const provinceValueRef = useRef<HTMLSpanElement | null>(null);
  const [provinceError, setProvinceError] = useState<string>();
  const districtValueRef = useRef<HTMLSpanElement | null>(null);
  const [districtError, setDistrictError] = useState<string>();
  const wardValueRef = useRef<HTMLSpanElement | null>(null);
  const [wardError, setWardError] = useState<string>();

  const [typeTag, setTypeTag] = useState<{}>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUserAddress>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: addressDetail?.username,
      phoneNumber: addressDetail?.phoneNumber,
      deliveryAddress: addressDetail?.deliveryAddress,
    },
  });

  const validateAddress = (
    provinceValue: string | null | undefined,
    districtValue: string | null | undefined,
    wardValue: string | null | undefined,
    { setProvinceError, setDistrictError, setWardError }: IErrorSetter
  ): boolean => {
    if (!provinceValue || provinceValue === "Vui lòng chọn tỉnh/thành phố") {
      setProvinceError("Thông tin bắt buộc");
      return false;
    }

    if (!districtValue || districtValue === "Vui lòng chọn quận/huyện") {
      setProvinceError("");
      setDistrictError("Thông tin bắt buộc");
      return false;
    }

    if (!wardValue || wardValue === "Vui lòng chọn phường/xã") {
      setProvinceError("");
      setDistrictError("");
      setWardError("Thông tin bắt buộc");
      return false;
    }

    setProvinceError("");
    setDistrictError("");
    setWardError("");
    return true;
  };

  const resetForm = () => {
    if (provinceValueRef.current) {
      provinceValueRef.current.textContent = "Vui lòng chọn tỉnh/thành phố";
      provinceValueRef.current.className = "text-gray text-[1.4rem]";
      setCurrentProvinces(null);
    }
    if (districtValueRef.current) {
      districtValueRef.current.textContent = "Vui lòng chọn quận/huyện";
      districtValueRef.current.className = "text-gray text-[1.4rem]";
      setCurrentDistricts(null);
    }
    if (wardValueRef.current) {
      wardValueRef.current.textContent = "Vui lòng chọn phường/xã";
      wardValueRef.current.className = "text-gray text-[1.4rem]";
      setCurrentWards(null);
    }
    if (setShowFormModal) {
      setShowFormModal(false);
    }
    if (isCreate) {
      router.push("/account/address");
    }
  };

  const onSubmit: SubmitHandler<TUserAddress> = async (data) => {
    const provinceValue = provinceValueRef.current?.textContent;
    const districtValue = districtValueRef.current?.textContent;
    const wardValue = wardValueRef.current?.textContent;

    const isValid = validateAddress(provinceValue, districtValue, wardValue, {
      setProvinceError,
      setDistrictError,
      setWardError,
    });

    if (isValid) {
      const dataAddress: TUserAddress = {
        ...data,
        province: {
          name: provinceValue || "",
          code: currentProvinces?.code || addressDetail?.province.code || "",
        },
        district: {
          name: districtValue || "",
          code: currentDistricts?.code || addressDetail?.district.code || "",
        },
        ward: {
          name: wardValue || "",
          code: currentWards?.code || addressDetail?.ward.code || "",
        },
        ...typeTag,
      };
      if (token) {
        if (addressDetail) {
          dataAddress.id = addressDetail.id;
          console.log(dataAddress);
          const result = await dispatch(
            editAddress({ dataAddress, token })
          ).unwrap();
          if (result.status === "success") {
            router.push("/account/address");
            reset();
            resetForm();
          }
        } else {
          dataAddress.id = randomId();
          const result = await dispatch(
            addToAddress({ dataAddress, token })
          ).unwrap();
          if (result.status === "success") {
            await dispatch(handleAddItemToAddress(dataAddress));
            reset();
            resetForm();
          }
        }
      }
    }
  };

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  useEffect(() => {
    const initialAddressDetail = async () => {
      if (
        addressDetail &&
        provinceValueRef.current &&
        districtValueRef.current &&
        wardValueRef.current
      ) {
        provinceValueRef.current.textContent = addressDetail.province?.name;
        await dispatch(fetchDistricts(addressDetail.province?.code));

        districtValueRef.current.textContent = addressDetail.district?.name;
        const districtsElement = document.getElementById("districtsDropdown");
        if (districtsElement) {
          districtsElement.classList.replace(
            "cursor-not-allowed",
            "cursor-pointer"
          );
          const firstChildElement = districtsElement.firstChild as Element;
          if (firstChildElement && firstChildElement.classList) {
            firstChildElement.classList.remove(
              "bg-white2",
              "cursor-pointer",
              "pointer-events-none"
            );
            firstChildElement.classList.add("bg-white", "pointer-events-auto");
          }
          const grandChildElement = districtsElement.firstChild
            ?.firstChild as Element;
          if (grandChildElement) {
            grandChildElement.classList.replace("text-gray", "text-dark");
          }
          await dispatch(fetchWards(addressDetail.district?.code));
        }

        wardValueRef.current.textContent = addressDetail.ward?.name;
        const wardsElement = document.getElementById("wardsDropdown");
        if (wardsElement) {
          wardsElement.classList.replace(
            "cursor-not-allowed",
            "cursor-pointer"
          );
          const firstChildElement = wardsElement.firstChild as Element;
          if (firstChildElement && firstChildElement.classList) {
            firstChildElement.classList.remove(
              "bg-white2",
              "cursor-pointer",
              "pointer-events-none"
            );
            firstChildElement.classList.add("bg-white", "pointer-events-auto");
          }
          const grandChildElement = wardsElement.firstChild
            ?.firstChild as Element;
          if (grandChildElement) {
            grandChildElement.classList.replace("text-gray", "text-dark");
          }
          await dispatch(fetchWards(addressDetail.district?.code));
        }
      }
    };
    initialAddressDetail();
  }, [addressDetail, dispatch]);

  const objProvinces = useAppSelector((state) => state.address.provinces);
  const provinces = objProvinces?.data?.provinces;

  const handleClickProvinces = (province: TProvince) => {
    if (
      provinceValueRef.current &&
      provinceValueRef.current.textContent !== province.name
    ) {
      setCurrentProvinces(province);
      setIsOpenProvinces(false);
      dispatch(fetchDistricts(province.code));
    }
    if (districtValueRef.current) {
      districtValueRef.current.textContent = "Vui lòng chọn quận/huyện";
    }
    if (wardValueRef.current) {
      wardValueRef.current.textContent = "Vui lòng chọn phường/xã";
    }
  };

  const objDistricts = useAppSelector((state) => state.address.districts);
  const districts = objDistricts?.data?.districts;

  const handleClickDistricts = (district: TDistrict) => {
    setCurrentDistricts(district);
    setIsOpenDistricts(false);
    setCurrentWards(null);
    dispatch(fetchWards(district.code));
    if (wardValueRef.current) {
      wardValueRef.current.textContent = "Vui lòng chọn phường/xã";
    }
  };

  const objWards = useAppSelector((state) => state.address.wards);
  const wards = objWards?.data?.wards;

  const handleClickWards = (ward: TWard) => {
    setCurrentWards(ward);
    setIsOpenWards(false);
    if (wardValueRef.current) {
      wardValueRef.current.className = "text-dark text-[1.4rem]";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const provincesElement = document.getElementById("provincesDropdown");
      const districtsElement = document.getElementById("districtsDropdown");
      const wardsElement = document.getElementById("wardsDropdown");

      if (
        provincesElement &&
        !provincesElement.contains(e.target as Node) &&
        isOpenProvinces
      ) {
        setIsOpenProvinces(false);
      }

      if (
        districtsElement &&
        !districtsElement.contains(e.target as Node) &&
        isOpenDistricts
      ) {
        setIsOpenDistricts(false);
      }
      if (
        wardsElement &&
        !wardsElement.contains(e.target as Node) &&
        isOpenWards
      ) {
        setIsOpenWards(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenProvinces, isOpenDistricts, isOpenWards]);

  const handleTypeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTypeTag({
      [name]: value,
    });
  };

  return (
    <section className="bg-white">
      <h2 className="text-[1.8rem] py-[2.5rem] px-[3.8rem] flex justify-between items-center">
        {setShowFormModal
          ? "Thêm địa chỉ nhận hàng mới"
          : isCreate || "Thông tin giao hàng"}
        {setShowFormModal && (
          <AiOutlineClose
            onClick={() => setShowFormModal(false)}
            className="text-gray hover:text-dark2 text-[2rem] cursor-pointer"
          />
        )}
      </h2>
      <div className="px-[3.8rem] pb-[3.8rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-[3rem]">
            <div className="flex-1">
              <div>
                <label
                  htmlFor="username"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Họ tên
                </label>{" "}
                <input
                  id="username"
                  {...register("username")}
                  className={`text-[1.4rem] h-[3.2rem] border ${
                    errors.username?.message ? "border-error" : "border-gray2"
                  } border-solid shadow3 px-4 w-full outline-none my-[0.2rem]`}
                  placeholder="Họ Tên"
                />
                <div className="mb-[1.4rem] text-error text-[1.2rem]">
                  {errors.username?.message}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Số điện thoại
                </label>{" "}
                <input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className={`text-[1.4rem] h-[3.2rem] border ${
                    errors.phoneNumber?.message
                      ? "border-error"
                      : "border-gray2"
                  } border-solid shadow3 px-4 w-full outline-none my-[0.2rem]`}
                  placeholder="Xin vui lòng nhập số điện thoại của bạn"
                />
                <div className="mb-[1.4rem] text-error text-[1.2rem]">
                  {errors.phoneNumber?.message}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <label
                  htmlFor="address"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Địa chỉ nhận hàng
                </label>{" "}
                <input
                  id="address"
                  {...register("deliveryAddress")}
                  className={`text-[1.4rem] h-[3.2rem] border ${
                    errors.deliveryAddress?.message
                      ? "border-error"
                      : "border-gray2"
                  } border-solid shadow3 px-4 w-full outline-none my-[0.2rem]`}
                  placeholder="Vui lòng nhập địa chỉ của bạn"
                />
                <div className="mb-[1.4rem] text-error text-[1.2rem]">
                  {errors.deliveryAddress?.message}
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Tỉnh/ Thành phố
                </label>{" "}
                <div id="provincesDropdown" className="relative">
                  <div
                    className={`flex items-center cursor-pointer justify-between h-[3.2rem] border ${
                      provinceError ? "border-error" : "border-gray2"
                    }  border-solid shadow3 px-4 w-full outline-none my-[0.2rem]`}
                    onClick={() => setIsOpenProvinces((prev) => !prev)}>
                    <span
                      ref={provinceValueRef}
                      className={`text-[1.4rem] ${
                        provinceValueRef.current &&
                        provinceValueRef.current.textContent !==
                          "Vui lòng chọn tỉnh/thành phố"
                          ? "text-dark"
                          : "text-gray"
                      }`}>
                      {currentProvinces?.name || "Vui lòng chọn tỉnh/thành phố"}
                    </span>
                    <TiArrowUnsorted className="text-[2rem] text-gray" />
                  </div>
                  {isOpenProvinces && (
                    <div className="absolute border border-solid border-[#eff0f5] bg-white w-full max-h-[26rem] overflow-auto shadow4 py-[1.2rem]">
                      {provinceValueRef.current &&
                        provinceValueRef.current.textContent !==
                          "Vui lòng chọn tỉnh/thành phố" && (
                          <div className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                            <IoIosCheckmark className="absolute left-0 top-[1.5rem] text-[2.4rem] text-secondary" />
                            {currentProvinces?.name ||
                              addressDetail?.province.name}
                          </div>
                        )}
                      {provinces?.map((province: TProvince) => (
                        <div
                          key={province.id}
                          onClick={() => handleClickProvinces(province)}
                          className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                          {province.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-[1.4rem] text-error text-[1.2rem]">
                    {provinceError}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Quận/ Huyện
                </label>{" "}
                <div
                  id="districtsDropdown"
                  className={`relative ${isOpenProvinces && "-z-10"} ${
                    provinceValueRef.current &&
                    provinceValueRef.current.textContent !==
                      "Vui lòng chọn tỉnh/thành phố"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}>
                  <div
                    onClick={() => setIsOpenDistricts((prev) => !prev)}
                    className={`flex items-center justify-between ${
                      provinceValueRef.current &&
                      provinceValueRef.current.textContent !==
                        "Vui lòng chọn tỉnh/thành phố"
                        ? "bg-white cursor-pointer"
                        : "bg-white2 pointer-events-none"
                    }  h-[3.2rem] border ${
                      districtError ? "border-error" : "border-gray2"
                    }  border-solid shadow3 px-4 w-full outline-none my-[0.2rem] `}>
                    <span
                      ref={districtValueRef}
                      className={`text-[1.4rem] ${
                        districtValueRef.current &&
                        districtValueRef.current.textContent !==
                          "Vui lòng chọn quận/huyện"
                          ? "text-dark"
                          : "text-gray"
                      }`}>
                      {currentDistricts?.name_with_type ||
                        "Vui lòng chọn quận/huyện"}
                    </span>
                    <TiArrowUnsorted className="text-[2rem] text-gray" />
                  </div>
                  {isOpenDistricts && (
                    <div className="absolute border border-solid border-[#eff0f5] bg-white w-full max-h-[26rem] overflow-auto shadow4 py-[1.2rem]">
                      {districtValueRef.current &&
                        districtValueRef.current.textContent !==
                          "Vui lòng chọn quận/huyện" && (
                          <div className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                            <IoIosCheckmark className="absolute left-0 top-[1.5rem] text-[2.4rem] text-secondary" />
                            {currentDistricts?.name_with_type ||
                              addressDetail?.district.name}
                          </div>
                        )}
                      {districts?.map((district: TDistrict) => (
                        <div
                          key={district.id}
                          onClick={() => handleClickDistricts(district)}
                          className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                          {district.name_with_type}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-[1.4rem] text-error text-[1.2rem]">
                    {districtError}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="text-[1.2rem] mb-[0.5rem] block">
                  Phường/ Xã
                </label>{" "}
                <div
                  id="wardsDropdown"
                  className={`relative ${
                    (isOpenDistricts || isOpenProvinces) && "-z-10"
                  } ${
                    districtValueRef.current &&
                    districtValueRef.current.textContent !==
                      "Vui lòng chọn quận/huyện"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}>
                  <div
                    onClick={() => setIsOpenWards((prev) => !prev)}
                    className={`flex items-center justify-between ${
                      districtValueRef.current &&
                      districtValueRef.current.textContent !==
                        "Vui lòng chọn quận/huyện"
                        ? "bg-white cursor-pointer"
                        : "bg-white2 pointer-events-none "
                    } h-[3.2rem] border ${
                      wardError ? "border-error" : "border-gray2"
                    }  border-solid shadow3 px-4 w-full outline-none my-[0.2rem]`}>
                    <span
                      ref={wardValueRef}
                      className={`text-[1.4rem] ${
                        wardValueRef.current &&
                        wardValueRef.current.textContent !==
                          "Vui lòng chọn phường/xã"
                          ? "text-dark"
                          : "text-gray"
                      }`}>
                      {currentWards?.name_with_type ||
                        "Vui lòng chọn phường/xã"}
                    </span>
                    <TiArrowUnsorted className="text-[2rem] text-gray" />
                  </div>
                  {isOpenWards && (
                    <div className="absolute border border-solid border-[#eff0f5] bg-white w-full max-h-[26rem] overflow-auto shadow4 py-[1.2rem]">
                      {wardValueRef.current &&
                        wardValueRef.current.textContent !==
                          "Vui lòng chọn phường/xã" && (
                          <div className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                            <IoIosCheckmark className="absolute left-0 top-[1.5rem] text-[2.4rem] text-secondary" />
                            {currentWards?.name_with_type ||
                              addressDetail?.ward.name}
                          </div>
                        )}
                      {wards?.map((ward: TWard) => (
                        <div
                          key={ward.id}
                          onClick={() => handleClickWards(ward)}
                          className="text-[1.4rem] leading-[2.8rem] px-[2rem] cursor-pointer hover:bg-[#eff0f5]">
                          {ward.name_with_type}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-[1.4rem] text-error text-[1.2rem]">
                    {wardError}
                  </div>
                </div>
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.4rem]">
                  Lựa chọn tên cho địa chỉ thường dùng:
                </p>
                <div className="flex items-center gap-[1.5rem] mt-[1.5rem]">
                  <input
                    type="radio"
                    name="type"
                    value="office"
                    id="office"
                    defaultChecked={addressDetail?.type === "office"}
                    onChange={handleTypeTag}
                    hidden
                  />
                  <label
                    htmlFor="office"
                    className="flex items-center justify-between p-[2rem] border border-solid border-primary rounded-[0.6rem]">
                    <MdWork className="text-gray size-[1.8rem] mr-[1rem]" />
                    <span className="text-[1.2rem]">VĂN PHÒNG</span>
                  </label>
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    id="home"
                    defaultChecked={addressDetail?.type === "home"}
                    onChange={handleTypeTag}
                    hidden
                  />
                  <label
                    htmlFor="home"
                    className="flex items-center justify-between p-[2rem] border border-solid border-primary rounded-[0.6rem]">
                    <TiHome className="text-gray size-[1.8rem] mr-[1rem]" />
                    <span className="text-[1.2rem]">NHÀ RIÊNG</span>
                  </label>
                </div>
              </div>
              <div className="mt-[3rem] text-end">
                {(setShowFormModal || isCreate) && (
                  <button
                    onClick={resetForm}
                    type="reset"
                    className="w-[16.8rem] h-[4rem] bg-gray6 text-[1.4rem] text-gray7 rounded-[0.2rem]">
                    HUỶ
                  </button>
                )}
                <button
                  type="submit"
                  className={`w-[16.8rem] h-[4rem] ${
                    addressDetail && addressDetail.id ? "bg-orange" : "bg-cyan"
                  }  text-[1.4rem] text-white rounded-[0.2rem] ml-[1.2rem]`}>
                  LƯU
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddressForm;
