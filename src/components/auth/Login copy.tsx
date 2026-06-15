"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import api from "@/lib/axios";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtpData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  // Form State
  const [userAD, setUserAD] = useState("");
  const [password, setPassword] = useState("");
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [WarningMessage, setWarningMessage] = useState("");

  
  // Handle Login
  const handleLogin = async () => {
    // cegah double click
    if (loading) return;
    if (!userAD || !password) {
      setWarningMessage("Username dan Password wajib diisi");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await api.post("/auth/login", {
        userAD,
        password,
      });
      const { status, otpToken, user } = response.data;
      if (status) {
        dispatch(
          setOtpData({
            otpToken,
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
        setErrorMessage(
          error.response?.data?.message || "Username atau password salah",
        );
      } else {
        setErrorMessage("Terjadi kesalahan");
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
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="space-y-6">
                {/* Username/userAD */}
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>
                  </Label>

                  <Input
                    placeholder="Username"
                    type="text"
                    value={userAD}
                    onChange={(e) => setUserAD(e.target.value)}
                    disabled={loading}
                  />
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                {/* Passowrd */}
                {/* Message OTP success */}
                {successMessage && (
                  <div className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-600">
                    {successMessage}
                  </div>
                )}
                {/* Message OTP success */}
                {/* Message Warning */}
                {WarningMessage && (
                  <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 shadow">
                    {WarningMessage}
                  </div>
                )}
                {/* Message Warning */}
                {/* Message error */}
                {errorMessage && (
                  <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 shadow">
                    {errorMessage}
                  </div>
                )}
                {/* Message error */}

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