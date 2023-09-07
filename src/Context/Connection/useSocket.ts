import { useContext } from "react";
import socketConnectionCTX from "./socketConnection";

export const useSocket = () => {
  const data = useContext(socketConnectionCTX);
  return data;
};

