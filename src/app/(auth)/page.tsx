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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 ">
      <div className="flex flex-col space-y-6 justify-center items-center bg-gray-700 shadow-2xl shadow-gray-700 p-16 rounded-lg">
        <h1 className="text-xl md:text-3xl font-bold ">EZE Streamz</h1>
        <Link href={"/login"}>
          <button className="px-4 py-2 border-none bg-slate-500 text-white rounded-lg">
            Login
          </button>
        </Link>

        <h1 className="font-bold">
          Don't Have an account yet? Join us for free 👨🏽‍💻
        </h1>
        <Link href={"/signup"}>
          <button className="px-4 py-2 border-none bg-slate-500 text-white rounded-lg">
            SignUp
          </button>
        </Link>
      </div>
    </main>
  );
}
