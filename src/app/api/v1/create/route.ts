import { NextRequest, NextResponse } from "next/server";

import { webSocketInit, IWebSocketInit } from "@/server/webSocket";

export const POST = async (data: NextRequest) => {
  try {
    await webSocketInit();
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
