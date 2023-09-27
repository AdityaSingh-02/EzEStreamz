"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import appwriteService from "@/appwrite-service/config";
import type { User } from "@/types/appwrite";
import useAuth from "@/Context/Authentication/useAuth";
import { useRouter } from "next/navigation";
import { AuthRequiredError } from "@/lib/AuthRequired";

interface Props {
  setError: Dispatch<SetStateAction<string>>;
}

const LoginForm: FC<Props> = ({ setError }: Props) => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const [userInput, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setInput({ ...userInput, email: value.toString() });
    } else {
      setInput({ ...userInput, password: value.toString() });
    }
  };

  const loginAction = async () => {
    if (userInput.password.length < 8 || userInput.email.length < 8) {
      setError("Please Enter valid Credentials");
      return;
    }

    try {
      const session = await appwriteService.login(userInput);
      if (session) {
        setAuthStatus(true);
      }
    } catch (error) {
      setError("Invalid Creds");
      throw new AuthRequiredError();
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-5 text-black">
        <input
          type="text"
          onChange={handleChange}
          className="px-4 py-2 rounded-lg "
          placeholder="Email"
          value={userInput.email}
          name="email"
        />
        <input
          type="password"
          onChange={handleChange}
          className="px-4 py-2 rounded-lg "
          placeholder="Password"
          value={userInput.password}
          name="password"
        />
        <button
          className="px-4 py-2 rounded-lg bg-red-500 font-bold"
          onClick={loginAction}
        >
          Login{" "}
        </button>
      </div>
    </>
  );
};

export default LoginForm;
