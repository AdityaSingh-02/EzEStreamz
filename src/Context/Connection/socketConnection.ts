import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { ISocketConnection } from "@/types/ISocketConn";

export interface IsocketConnection {
  connectionStatus: boolean;
  setConnectionStatus: (status: boolean) => void;
  setURL: (url: string) => void;
}

export const socketConnectionCTX = createContext(<IsocketConnection>{
  connectionStatus: false,
  setConnectionStatus: {},
  setURL(url) {},
});

export const SocketConnectionProvider = socketConnectionCTX.Provider;
export const useSocketConnection = () => useContext(socketConnectionCTX);
export default socketConnectionCTX;
