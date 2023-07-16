"use client";
import type { Metadata } from "next";
import React from "react";
import useAuth from "@/Context/useAuth";
import { useRouter } from "next/navigation";
import PeerProvider from "@/Context/usePeer";

export const metadata: Metadata = {
  title: "Demo",
  description: "Video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const {authStatus} = useAuth();
  // if(!authStatus){
  //     router.replace('/')
  //     return <></>
  // }
  return (
    <PeerProvider>
      <main className="w-[100%]">{children}</main>;
    </PeerProvider>
  );
}
