import { server, w3cwebsocket } from "websocket";
import http from "http";

const createWebSocket = async () => {
  let connection = null;
  const httpserver = http.createServer();

  const websocket = new server({
    httpServer: httpserver,
  });
  
  websocket.on("request", (request) => {
    connection = request.accept(null, request.origin);
  });
  return connection
};

export default createWebSocket;
