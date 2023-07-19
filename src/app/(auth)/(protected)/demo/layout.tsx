"use client";
import type { Metadata } from "next";
import React from "react";
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
  return (
    <PeerProvider>
      <main className="w-[100%]">{children}</main>;
    </PeerProvider>
  );
}
