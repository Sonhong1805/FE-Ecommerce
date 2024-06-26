"use client";
import AccountNavbar from "@/components/AccountNavbar";
import UserDropdownField from "@/components/UserDropdownField";
import baseURL from "@/constants/baseURL";
import { getDays, getMonths, getYears } from "@/constants/dateOfBirth";
import isFullUrl from "@/helpers/checkUrl";
import { getToken } from "@/helpers/common";
import { obfuscateEmail } from "@/helpers/obfuscateEmail";
import {
  updateMeWithAvatar,
  updateMeWithoutAvatar,
} from "@/lib/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const EditAccount = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = getToken();
  const currentInfoUser = useAppSelector((state) => state.user.infoUser);

  const days = getDays();
  const months = getMonths();
  const years = getYears();
  const genders: ["Nam", "Nữ"] = ["Nam", "Nữ"];

  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("/images/avatar-default.jpg");
  const [day, setDay] = useState<string | undefined>(undefined);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);

  const [isShowDayModal, setIsShowDayModal] = useState<boolean>(false);
  const [isShowMonthModal, setIsShowMonthModal] = useState<boolean>(false);
  const [isShowYearModal, setIsShowYearModal] = useState<boolean>(false);
  const [isShowGenderModal, setIsShowGenderModal] = useState<boolean>(false);

  const dayModalRef = useRef<HTMLDivElement | null>(null);
  const monthModalRef = useRef<HTMLDivElement | null>(null);
  const yearModalRef = useRef<HTMLDivElement | null>(null);
  const genderModalRef = useRef<HTMLDivElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const taxCodeRef = useRef<HTMLInputElement | null>(null);

  const [previewAvatar, setPreviewAvatar] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>();

  const { data: session } = useSession();

  useEffect(() => {
    if (currentInfoUser?.avatar) {
      if (isFullUrl(currentInfoUser.avatar)) {
        setAvatar(currentInfoUser.avatar);
      } else {
        setAvatar(`${baseURL}/images/${currentInfoUser.avatar}`);
      }
    } else {
      setAvatar("/images/avatar-default.jpg");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (currentInfoUser) {
      const { username, dateOfBirth, gender } = currentInfoUser;
      const { day, month, year } = dateOfBirth || {};
      setUsername(username || "");
      setDay(day || undefined);
      setMonth(month || undefined);
      setYear(year || undefined);
      setGender(gender || undefined);
    }
  }, [currentInfoUser]);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePreviewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setPreviewAvatar(src);
      setSelectedAvatar(file);
    }
  };

  const saveUserInfo = async () => {
    if (!username) {
      return;
    }

    const dataInfo: TInfoUser = {
      username,
      email: currentInfoUser?.email,
      dateOfBirth: {
        day,
        month,
        year,
      },
      gender,
      phoneNumber: phoneNumberRef.current?.value || undefined,
      taxCode: taxCodeRef.current?.value || undefined,
    };

    if (token) {
      if (selectedAvatar) {
        const result = await dispatch(
          updateMeWithAvatar({ dataInfo, file: selectedAvatar, token })
        ).unwrap();
        if (result.status === "success") {
          router.push("/account/profile");
        }
      } else {
        dataInfo.avatar = currentInfoUser.avatar;
        const result = await dispatch(
          updateMeWithoutAvatar({ dataInfo, token })
        ).unwrap();
        if (result.status === "success") {
          router.push("/account/profile");
        }
      }
    }
  };

  return (
    <main className="bg-white2">
      <div className="container flex justify-between">
        <AccountNavbar />
        <section>
          <div className="w-[98.8rem]">
            <h1 className="text-[2.2rem] font-normal leading-[6rem]">
              Chỉnh sửa
            </h1>
            <div className="bg-white p-[4rem]">
              <div className="flex">
                <div className="flex-1 grid grid-cols-2">
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Họ tên</h3>
                    <div>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={username}
                        placeholder="Họ Tên"
                        className={`text-[1.4rem] w-3/4 h-[4rem] border ${
                          username === "" ? "border-error" : "border-gray2"
                        }  border-solid shadow3 px-4 mb-[0.2rem]`}
                        onChange={handleChangeUsername}
                        onBlur={handleChangeUsername}
                      />
                      <br />
                      {username === "" && (
                        <span className="text-[1.2rem] mb-[1rem] text-error">
                          Không được bỏ trống
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Địa chỉ email</h3>
                    <p className="text-[1.4rem] pt-[0.7rem]">
                      {currentInfoUser?.email &&
                        obfuscateEmail(currentInfoUser.email)}
                    </p>
                  </div>
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Số điện thoại</h3>
                    <div>
                      <input
                        type="text"
                        ref={phoneNumberRef}
                        defaultValue={currentInfoUser?.phoneNumber}
                        id="phoneNumber"
                        placeholder="Số điện thoại"
                        className="text-[1.4rem] w-3/4 h-[4rem] border border-gray2 border-solid shadow3 px-4 mb-[0.2rem]"
                      />
                    </div>
                  </div>
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Ngày sinh</h3>
                    <div className="flex">
                      <UserDropdownField
                        label={day || "01"}
                        items={days}
                        setItem={setDay}
                        isShowModal={isShowDayModal}
                        setIsShowModal={setIsShowDayModal}
                        modalRef={dayModalRef}
                        minWidth={9}
                      />
                      <UserDropdownField
                        label={month || "01"}
                        items={months}
                        setItem={setMonth}
                        isShowModal={isShowMonthModal}
                        setIsShowModal={setIsShowMonthModal}
                        modalRef={monthModalRef}
                        minWidth={9}
                      />
                      <UserDropdownField
                        label={year || "1999"}
                        items={years}
                        setItem={setYear}
                        isShowModal={isShowYearModal}
                        setIsShowModal={setIsShowYearModal}
                        modalRef={yearModalRef}
                        minWidth={8}
                      />
                    </div>
                  </div>
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Giới tính</h3>
                    <div className="flex">
                      <UserDropdownField
                        label={gender || "Chọn"}
                        items={genders}
                        setItem={setGender}
                        isShowModal={isShowGenderModal}
                        setIsShowModal={setIsShowGenderModal}
                        modalRef={genderModalRef}
                        minWidth={10}
                      />
                    </div>
                  </div>
                  <div className="min-h-[11rem]">
                    <h3 className="text-[1.2rem] mb-[1rem]">Mã số thuế</h3>
                    <div>
                      <input
                        type="text"
                        id="tax-code"
                        ref={taxCodeRef}
                        defaultValue={currentInfoUser?.taxCode}
                        placeholder="Nhập mã số thuế của bạn"
                        className="text-[1.4rem] w-3/4 h-[4rem] border border-gray2 border-solid shadow3 px-4 mb-[0.2rem]"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center px-[3rem]">
                  <figure className="mb-[3rem] w-[15rem] h-[15rem] rounded-full overflow-hidden">
                    <Image
                      src={previewAvatar ? previewAvatar : avatar}
                      className="w-full h-full object-cover"
                      width={150}
                      height={150}
                      alt=""
                      priority
                    />
                  </figure>
                  <input
                    type="file"
                    id="avatar"
                    hidden
                    onChange={handlePreviewAvatar}
                  />
                  <label
                    htmlFor="avatar"
                    className="h-[4.8rem] block text-[1.6rem] text-center m-auto max-w-[13rem] text-gray border border-solid border-gray px-[2rem] py-[1rem] cursor-pointer">
                    Chọn ảnh
                  </label>
                </div>
              </div>
              <div className="mt-[8rem] w-[28.8rem]">
                <button
                  onClick={saveUserInfo}
                  className="h-[4.8rem] w-full text-[1.4rem] px-[3.6rem] leading-[4.6rem] bg-secondary text-white mb-[1.6rem]">
                  LƯU THAY ĐỔI
                </button>
                <button
                  onClick={() => router.push("/account/profile")}
                  className="h-[4.8rem] w-full text-[1.4rem] px-[3.6rem] leading-[4.6rem] bg-secondary text-white mb-[1.6rem]">
                  HUỶ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EditAccount;
