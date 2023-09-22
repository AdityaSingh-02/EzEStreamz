"use client";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Demo",
  description: "Video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-[100%]">{children}</main>;
}
