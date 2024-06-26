"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa6";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/authThunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { setToken } from "@/helpers/common";
import { useRouter } from "next/navigation";
import { handleReload } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Thông tin bắt buộc" })
    .email({ message: "Địa chỉ Email không hợp lệ" }),
  password: z.string().nonempty({ message: "Thông tin bắt buộc" }),
});

const MySwal = withReactContent(Swal);

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    const { email, password } = data;
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.status === "success") {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Đăng nhập thành công !!!",
          showConfirmButton: false,
          timer: 1500,
        });
        const token = result?.data.token;
        setToken("token", token, 1);
        setIsShowPassword(false);
        reset();
        setTimeout(() => {
          router.push("/");
          dispatch(handleReload(true));
        }, 1300);
      }
    } catch (error) {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Mật khẩu không chính xác !!!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <main className="bg-white2 h-screen">
      <div className="container p-12">
        <div className="w-[80rem] mx-auto bg-white py-12 px-[15rem]">
          <h3 className="text-dark text-[1.75rem] uppercase mb-[0.875rem] font-medium ">
            đăng nhập
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
                id="email"
                {...register("email")}
                className="text-[1.4rem] h-[3.2rem] border border-gray2 border-solid shadow3 px-4 w-full outline-none mb-[1.4rem]"
              />
            </div>
            <p className="text-red-500 text-[1.4rem] relative top-[-1.2rem]">
              {errors.email?.message}
            </p>
            <div className="mb-[0.7rem]">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[1.26rem] text-dark3 mb-[0.5rem] font-medium block">
                  Mật khẩu *
                </label>
                <Link
                  href={"/forgot-password"}
                  className="text-[1.4rem] text-gray hover:text-secondary">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
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
            <button
              type="submit"
              className="px-[1.4rem] w-full py-1 bg-secondary text-white font-bold mt-4 mb-8 text-[1.6rem] uppercase">
              Đăng nhập
            </button>
          </form>
          <div>
            <p className="text-center text-gray text-[1.4rem] mb-[1.5rem]">
              Hoặc, đăng nhập bằng
            </p>
            <SignIn />
          </div>
          <p className="text-gray text-[1.4rem] mt-4 text-center">
            Đăng ký tại đây?{" "}
            <Link href={"/signup"} className="text-secondary">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
