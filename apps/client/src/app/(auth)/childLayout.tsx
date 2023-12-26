"use client";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/Context/Authentication/authContext";
import appwriteService from "@/appwrite-service/config";
import { WebSocketProvider } from "@/web-socket";

export default function TempLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  const wsUrl = "ws://localhost:8080";

  useEffect(() => {
    appwriteService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      <WebSocketProvider url={wsUrl}>
      {!loader && <main className="w-[100%]">{children}</main>}
      </WebSocketProvider>
    </AuthProvider>
  );
}
