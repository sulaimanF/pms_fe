"use client";
// import Checkbox from "@/components/form/input/Checkbox";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
// import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import React, { useState } from "react";

export default function SignInForm() {
  const [showPassword] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-600 px-4">
      
      <div className="w-full max-w-[450px] rounded-[30px] bg-[#ececec] px-10 py-12 shadow-lg">
        <div>
          <div className="mb-10 flex justify-center">
            <Image
              width={231}
              height={48}
              src="../images/btn.svg"
              alt="Logo"
            />
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="Username" type="text" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    {/* <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span> */}
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
