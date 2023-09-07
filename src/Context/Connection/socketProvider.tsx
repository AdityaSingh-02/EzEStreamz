import { ReactNode, useState } from "react";
import { ISocketConnection } from "@/types/ISocketConn";
import { socketConnectionCTX } from "./socketConnection";

interface IProps {
  children: ReactNode;
}

const socketProvider = ({ children }: IProps) => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [url, setURL] = useState<string>("");

  const urlSetterFn = (u: string) => {
    if (connectionStatus) {
      setURL(u);
    }
  };

  return (
    <socketConnectionCTX.Provider
      value={{ connectionStatus, setConnectionStatus, setURL }}>
      {children}
    </socketConnectionCTX.Provider>
  );
};
