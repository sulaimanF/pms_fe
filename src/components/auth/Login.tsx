"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/Alert/Alert";
import Image from "next/image";
import api from "@/lib/axios";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtpData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/validations/loginSchema";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  // Form State
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Handle Login
  const handleLogin = async (data: LoginFormData) => {
    // cegah double click
    if (loading) return;
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await api.post("/auth/login", {
        userAD: data.userAD,
        password: data.password,
      });
      const { status, otpToken, user, otpExpiredAt } = response.data;
      if (status) {
        dispatch(
          setOtpData({
            otpToken,
            otpExpiredAt,
            user,
          })
        );
        setSuccessMessage("OTP berhasil dikirim");
        setTimeout(() => {
          router.push("/auth/otp");
        }, 1000);
      }
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        const status = error.response?.status;
        if (status === 429) {
          setErrorMessage("Terlalu banyak percobaan login");
        } else if (status === 423) {
          setErrorMessage("OTP sedang dikunci sementara");
        } else if (status === 422) {
          setErrorMessage("OTP masih aktif");
        } else if (status === 401) {
          setErrorMessage("Username atau password salah");
        } else {
          setErrorMessage("Terjadi kesalahan");
        }
      }
    } finally {
      // loading selesai
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-600 px-4">
      <div className="w-full max-w-[450px] rounded-[30px] bg-[#ececec] px-10 py-12 shadow-lg">
        <div>
          <div className="mb-10 flex justify-center">
            <Image
              width={231}
              height={48}
              src="/images/btn.svg"
              alt="Logo"
              priority
            />
          </div>
          <div>
            <form
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="space-y-6">

                {successMessage && (
                  <Alert
                    variant="success"
                    title="Login Berhasil"
                    message={successMessage}
                  />
                )}

                {errorMessage && (
                  <Alert
                    variant="error"
                    title="Login Gagal"
                    message={errorMessage}
                  />
                )}

                {/* Username/userAD */}
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    {...register("userAD")}
                    placeholder="Username"
                    disabled={loading}
                  />
                  {/* Message error */}
                  {errors.userAD && (
                    <p className="text-sm text-red-500">
                      {errors.userAD.message}
                    </p>
                  )}
                  {/* Message error */}
                </div>
                {/* Username/userAD */}
                
                {/* Password */}
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Password"
                      disabled={loading}
                    />
                    {/* Message error */}
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                    {/* Message error */}
                  </div>
                </div>
                {/* Passowrd */}

                {/* Button */}
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </div>
                {/* Button */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}