import { ReactNode, useState } from "react";
import { ISocketConnection } from "@/types/ISocketConn";
import { ISocketConnectionCTX } from "./socketConnection";

interface IProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: IProps) => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [url, setURL] = useState<string>("");

  const urlSetterFn = (u: string) => {
    if (connectionStatus) {
      setURL(u);
    }
  };

  return (
    <ISocketConnectionCTX.Provider
      value={{ connectionStatus, setConnectionStatus, setURL }}>
      {children}
    </ISocketConnectionCTX.Provider>
  );
};

export default SocketProvider;