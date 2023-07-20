"use client";
import type { Metadata } from "next";
import React, { useState } from "react";
import { useAuth } from "@/Context/index";
import { useRouter } from "next/navigation";
import { VideoProvider } from "@/Context";

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
  const { authStatus } = useAuth();
  const [videoStatus, setVideoStatus] = useState(true);

  if (!authStatus) {
    router.replace("/");
    return <></>;
  }

  return (
    <>
      <VideoProvider value={{ videoStatus, setVideoStatus }}>
        <main className="w-[100%]">{children}</main>
      </VideoProvider>
    </>
  );
}
