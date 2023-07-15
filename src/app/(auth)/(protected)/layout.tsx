"use client";
import type { Metadata } from "next";
import React from "react";
import useAuth from "@/Context/useAuth";
import { useRouter } from "next/navigation";


export const metadata: Metadata = {
  title: "Welcome",
  description: "Video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    const {authStatus} = useAuth();
    if(!authStatus){
        router.replace('/')
        return <></>
    }
  return <main className="w-[100%]">{children}</main>;
}
