"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";
const initialSignUpData = {
  email: "",
  password: "",
};
export default function SignUpCard() {
  const [currentSignUpData, setSignUpData] = useState(initialSignUpData);
  const router = useRouter();

  function handleButtonDisabled() {
    if (
      currentSignUpData.email.trim() === "" ||
      currentSignUpData.password.trim() === ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  function handleSignUp() {
    fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(currentSignUpData),
    }).then((res) => {
      res.json().then((res) => {
        if (res.success) {
          toast.success(`Otp Send on ${res.email}`);
          sessionStorage.setItem("email", res.email);

          router.push("/sign-up/verification-of-email");
        } else {
          toast.error(res.message);
        }
      });
    });
  }

  return (
    <>
      <div
        className="relative flex  w-full  flex-col bg-[#f8fafb]   overflow-x-hidden"
        style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container w-full flex h-full grow flex-col">
          <div className="lg:px-40 flex flex-1 justify-center lg:py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <div className="@container">
                <div className="@[480px]:px-4 @[480px]:py-3">
                  <div
                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8fafb] @[480px]:rounded-xl min-h-[218px]"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/5b378b0c-c722-4171-9296-7089d741ebb5.png")',
                    }}
                  />
                </div>
              </div>
              <form action={handleSignUp}>
                <h2 className="text-[#0e161b] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
                  Create an account
                </h2>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#0e161b] font-semibold font-medium leading-normal pb-2">
                      Email
                    </p>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e161b] focus:outline-0 focus:ring-0 border-none bg-[#e8eef3] focus:border-none h-14 placeholder:text-[#507a95] p-4 text-base font-normal leading-normal"
                      defaultValue=""
                      onChange={(e) => {
                        setSignUpData({
                          ...currentSignUpData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#0e161b] font-semibold font-medium leading-normal pb-2">
                      Password
                    </p>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e161b] focus:outline-0 focus:ring-0 border-none bg-[#e8eef3] focus:border-none h-14 placeholder:text-[#507a95] p-4 text-base font-normal leading-normal"
                      defaultValue=""
                      onChange={(e) => {
                        setSignUpData({
                          ...currentSignUpData,
                          password: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="flex px-4 py-3 justify-end">
                  <Button
                    disabled={handleButtonDisabled()}
                    type="submit"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1d8cd7] text-[#f8fafb] text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate w-full">Sign up</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
