"use client";

import type { Metadata } from "next";
import { AuthProvider } from "@/Context/authContext";
import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite-service/config";

export const metadata: Metadata = {
  title: "Authentication",
  description: "User Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  
  useEffect(() => {
    appwriteService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && <main className="w-[100%]">{children}</main>}
    </AuthProvider>
  )
}
