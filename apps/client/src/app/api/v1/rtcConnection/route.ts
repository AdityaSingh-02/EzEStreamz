import { NextRequest, NextResponse } from "next/server";
import createClientRTC from "@/server/clientRTC";
import type { IWebSocketInit } from "@/server/webSocket";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { call, email, name, rid }: IWebSocketInit = data;
  try {
    const res = await createClientRTC({ call, email, name, rid });
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
