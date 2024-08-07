import type { Metadata } from "next";
import React from "react";
import ChildLayout from "./childLayout";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Get Started with video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ChildLayout>{children}</ChildLayout> */}
      {children}
    </>
  );
}
