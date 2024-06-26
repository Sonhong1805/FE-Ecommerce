"use client";
import { getToken } from "@/helpers/common";
import { changePassword } from "@/lib/features/user/userThunk";
import { useAppDispatch } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { z } from "zod";

const schema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Thông tin bắt buộc" })
      .min(8, "Độ dài mật khẩu phải từ 8-20 kí tự.")
      .max(20, "Độ dài mật khẩu phải từ 8-20 kí tự.")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/, {
        message:
          "Mật khẩu nên chứa các chữ cái, số và ký hiệu. Ít nhất 8 ký tự và không có khoảng trắng.",
      }),
    confirmPassword: z.string().nonempty({ message: "Thông tin bắt buộc" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu bạn đã nhập không trùng nhau",
    path: ["confirmPassword"],
  });
const MySwal = withReactContent(Swal);

const ChangePassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const token = getToken();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<IForgotPasswordInputs> = async (data) => {
    const { password } = data;
    if (token) {
      const response = await dispatch(
        changePassword({ password, token })
      ).unwrap();
      if (response.status === "success") {
        reset();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Thay đổi thành công !!!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push("/account/profile");
        }, 1300);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgotPasswordInputs>({
    resolver: zodResolver(schema),
  });

  return (
    <main className="bg-white2">
      <div className="container">
        <div className="py-[3rem] mx-[5rem]">
          <h1 className="text-[2.2rem] text-dark5 mb-[1.4rem]">
            Đặt lại mật khẩu
          </h1>
          <div className="bg-white py-[3.7rem] px-[5rem]">
            <h3 className="text-[1.4rem] text-dark5 mb-[3rem]">
              Nhập mật khẩu mới của bạn bên dưới.
            </h3>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[0.7rem] ">
                <label
                  htmlFor="password"
                  className="text-[1.26rem] text-dark3 mb-[0.5rem] font-medium block">
                  Mật khẩu mới*
                </label>
                <div className="relative w-[35.6rem]">
                  <input
                    placeholder="Tối thiểu 8 ký tự với số, chữ cái và ký tự."
                    type={isShowPassword ? "text" : "password"}
                    {...register("password")}
                    id="new-password"
                    className="text-[1.4rem] h-[3.2rem] border border-gray2 border-solid shadow3 px-4 w-full outline-none mb-[1.4rem]"
                  />
                  {isShowPassword ? (
                    <TbEye
                      className="absolute cursor-pointer right-[1rem] top-[0.4rem] text-[2.6rem]"
                      onClick={() => setIsShowPassword(false)}
                    />
                  ) : (
                    <TbEyeClosed
                      className="absolute cursor-pointer right-[1rem] top-[0.4rem] text-[2.6rem]"
                      onClick={() => setIsShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <p className="text-red-500 text-[1.4rem] relative top-[-1.2rem]">
                {errors.password?.message}
              </p>
              <div className="mb-[0.7rem]">
                <label
                  htmlFor="password"
                  className="text-[1.26rem] text-dark3 mb-[0.5rem] font-medium block">
                  Xác nhận mật khẩu mới*
                </label>
                <div className="relative w-[35.6rem]">
                  <input
                    placeholder="Vui lòng nhập lại mật khẩu"
                    type={isConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    id="confirm-password"
                    className="text-[1.4rem] h-[3.2rem] border border-gray2 border-solid shadow3 px-4 w-full outline-none mb-[1.4rem]"
                  />
                  {isConfirmPassword ? (
                    <TbEye
                      className="absolute cursor-pointer right-[1rem] top-[0.4rem] text-[2.6rem]"
                      onClick={() => setIsConfirmPassword(false)}
                    />
                  ) : (
                    <TbEyeClosed
                      className="absolute cursor-pointer right-[1rem] top-[0.4rem] text-[2.6rem]"
                      onClick={() => setIsConfirmPassword(true)}
                    />
                  )}
                </div>
              </div>
              <p className="text-red-500 text-[1.4rem] relative top-[-1.2rem]">
                {errors.confirmPassword?.message}
              </p>
              <button
                type="submit"
                className="w-[28.8rem] h-[4.8rem] px-[3.6rem] leading-[4.6rem] text-[1.4rem] bg-orange text-white">
                GỬI
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
