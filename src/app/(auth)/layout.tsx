import type { Metadata } from "next";
import TempLayout from "./childLayout";

export const metadata: Metadata = {
  title: "Authentication",
  description: "User Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <TempLayout>{children}</TempLayout>
    </>
  )
}
