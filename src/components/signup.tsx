"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import appwriteService from "@/appwrite-service/config";
import type { CreateUser } from "@/types/appwrite";
import useAuth from "@/Context/Authentication/useAuth";
import { useRouter } from "next/navigation";

interface Props {
  setError: Dispatch<SetStateAction<string>>;
}

const SignupForm: FC<Props> = ({ setError }: Props) => {
  const { setAuthStatus } = useAuth();
  const router = useRouter();
  const [userInput, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "name") {
      setInput({ ...userInput, name: value.toString() });
    }
    if (name == "email") {
      setInput({ ...userInput, email: value.toString() });
    }
    if (name == "password") {
      setInput({ ...userInput, password: value.toString() });
    }
  };

  const signUpAction = async () => {
    if (userInput.password.length < 8 && userInput.email.length < 7) {
      setError("Email and Password too short, Provide Authentic Details");
      return;
    }
    if (userInput.email.length < 7) {
      setError("Provide Authentic Email");
      return;
    }
    if (userInput.password.length < 8) {
      setError(
        "Password too short, please enter a valid password with atleast 8 characters",
      );
      return;
    }
    const res = await appwriteService.createUser(userInput);
    if (res) {
      setAuthStatus(true);
      router.replace("/");
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-5 text-black">
        <input
          type="text"
          onChange={handleChange}
          className="px-4 py-2 rounded-lg "
          placeholder="Name"
          value={userInput.name}
          name="name"
        />
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
          onClick={signUpAction}
        >
          SignUp{" "}
        </button>
      </div>
    </>
  );
};

export default SignupForm;
