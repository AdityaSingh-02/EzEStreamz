import { createContext } from "react";

interface IsocketConnection {
  connectionStatus: boolean;
  setConnection: (url: string) => void;
}

const socketConnectionCTX = createContext(<IsocketConnection>{
  connectionStatus: false,
  setConnection: () => {},
});

export const socketConnectionProvider = socketConnectionCTX.Provider;
export default socketConnectionCTX;
