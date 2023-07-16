import { NextRequest, NextResponse } from "next/server";
import createClientRTC from "@/server/clientRTC";
import type {IWebSocketInit} from '@/server/webSocket'

export const POST = async (data: IWebSocketInit) => {
    // const {method, email, name, rid}:IWebSocketInit = data;
    try {
        createClientRTC(data);
        return NextResponse.json({ message: "success" });
    } catch (error:any) {
        throw new Error(error.message);
    }
}