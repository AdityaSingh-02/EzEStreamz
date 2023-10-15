"use client";
import React, { useState } from "react";
import { useAuth } from "@/Context/index";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/login";
import { AuthRequiredError } from "@/lib/AuthRequired";

const Login = () => {
  const { authStatus } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  if (error) {
    throw new AuthRequiredError();
  }

  if (authStatus) {
    router.replace("/profile");
    return <></>;
  }
  return (
    <>
      <div className="flex min-h-screen  mx-auto justify-center py-20 min-[820px]:w-[50%] h-[50%]">
        <div className="flex flex-col bg-blue-500 justify-center items-center w-[100%]">
          <h1 className="text-3xl font-medium text-black">
            Login Here
          </h1>
          {/* <p className="text-gray-400">
            Don't Have a account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-red-500"
            >
              signup
            </button>
          </p> */}
          <div className="py-10 w-[100%]">
            <LoginForm setError={setError} />
          </div>

          <span className="text-xl mt-10">Login with Social Media Accounts</span>
        </div>
      </div>
    </>
  );
};

export default Login;
