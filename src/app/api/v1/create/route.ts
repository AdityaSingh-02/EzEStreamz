import { NextRequest, NextResponse } from "next/server";
import createWebSocket from "@/web-socket/socket";

createWebSocket();

export const POST = (request: NextRequest) => {
    return NextResponse.redirect('/')
}