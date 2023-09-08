import { ReactNode, useState } from "react";
import { ISocketConnectionCTX } from "./socketConnection";

interface IProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: IProps) => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [getURL, setURL] = useState<string>("");

  const urlSetterFn = (u: string) => {
    if (connectionStatus) {
      setURL(u);
    }
  };

  return (
    <ISocketConnectionCTX.Provider
      value={{
        connectionStatus,
        setConnectionStatus,
        setURL,
        getURL() {
          return getURL;
        },
      }}>
      {children}
    </ISocketConnectionCTX.Provider>
  );
};

export default SocketProvider;
