import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { ISocketConnection } from "@/types/ISocketConn";

export interface IsocketConnection {
  connectionStatus: boolean;
  setConnectionStatus: (status: boolean) => void;
  setURL: (url: string) => void;
}

export const ISocketConnectionCTX = createContext(<IsocketConnection>{
  connectionStatus: false,
  setConnectionStatus: {},
  setURL(url) {},
});

export const useSocketConnection = () => useContext(ISocketConnectionCTX);
