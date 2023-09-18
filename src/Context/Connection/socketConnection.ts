import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { ISocketConnection } from "@/types/ISocketConn";

export interface IsocketConnection {
  connectionStatus: boolean;
  setConnectionStatus: (status: boolean) => void;
  setURL: (url: WebSocket) => void;
  getURL(): void;
}

export const ISocketConnectionCTX = createContext(<IsocketConnection>{
  connectionStatus: false,
  setConnectionStatus: {},
  setURL(url) {},
  getURL() {},
});

export const useSocketConnection = () => useContext(ISocketConnectionCTX);
