"use client";
import "./app.css";
import Link from "next/link";
import useAuth from "@/Context/Authentication/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Login from "./login/page";
import { Inria_Sans } from "next/font/google";

const inria = Inria_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const router = useRouter();
  const { authStatus } = useAuth();
  useEffect(() => {
    if (authStatus) {
      router.replace("/profile");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900">
      <div className={`${inria.className} min-[820px]:flex flex-row items-center min-h-screen w-[100%] h-[100%]`}>
        {/* <h1 className="text-xl md:text-3xl font-bold ">EZE Streamz</h1> */}

        <div className="justify-center items-center min-[820px]:min-h-screen w-[70%] h-[100%]">
          <h1 className="font-bold">
            Don't Have an account yet? Join us for free 👨🏽‍💻
          </h1>
          <Link href={"/signup"}>
            <button className="px-4 py-2 border-none bg-slate-500 text-white rounded-lg">
              SignUp
            </button>
          </Link>
        </div>

        <Login />
      </div>
    </main>
  );
}
