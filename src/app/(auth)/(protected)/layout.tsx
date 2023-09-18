import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Video call",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <PeerProvider>
        <VideoProvider value={{ videoStatus, setVideoStatus }}>
          <main className="w-[100%]">
            <UserProvider>{children}</UserProvider>
          </main>
        </VideoProvider>
      </PeerProvider>
    </>
  );
}
