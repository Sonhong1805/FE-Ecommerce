"use client";
import { forgotPassword } from "@/lib/features/auth/authThunk";
import { useAppDispatch } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { z } from "zod";

const schema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Thông tin bắt buộc" })
      .email({ message: "Địa chỉ Email không hợp lệ" }),
    password: z
      .string()
      .nonempty({ message: "Thông tin bắt buộc" })
      .min(12, "Mật khẩu phải có ít nhất 12 ký tự")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_!@#$%^&*()\-+=[\]{};':"\\|,.<>/?]).{12,}$/,
        {
          message:
            "Mật khẩu phải chứa ít nhất 12 ký tự bao gồm ký tự đặc biệt, số, chữ HOA, chữ thường",
        }
      ),
    confirmPassword: z.string().nonempty({ message: "Thông tin bắt buộc" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp. Vui lòng nhập lại",
    path: ["confirmPassword"],
  });
const MySwal = withReactContent(Swal);

const ForgotPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgotPasswordInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IForgotPasswordInputs> = async (data) => {
    const { email, password } = data;
    const response = await dispatch(
      forgotPassword({ email, password })
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
        router.push("/login");
      }, 1300);
    }
  };

  return (
    <main className="bg-white2 h-screen">
      <div className="container p-12">
        <div className="w-[80rem] mx-auto bg-white py-12 px-[15rem]">
          <h3 className="text-dark text-[1.75rem] uppercase mb-[0.875rem] font-medium ">
            Thay đổi mật khẩu
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[0.7rem]">
              <label
                htmlFor="email"
                className="text-[1.26rem] text-dark3 mb-[0.5rem] font-medium block">
                Địa chỉ email *
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                className="text-[1.4rem] h-[3.2rem] border border-gray2 border-solid shadow3 px-4 w-full outline-none mb-[1.4rem]"
              />
            </div>
            <p className="text-red-500 text-[1.4rem] relative top-[-1.2rem]">
              {errors.email?.message}
            </p>
            <div className="mb-[0.7rem]">
              <label
                htmlFor="password"
                className="text-[1.26rem] text-dark3 mb-[0.5rem] font-medium block">
                Mật khẩu mới*
              </label>
              <div className="relative">
                <input
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
              <div className="relative">
                <input
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
            <button className="px-[1.4rem] w-full py-1 bg-secondary text-white font-bold mt-4 mb-8 text-[1.6rem] uppercase">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
