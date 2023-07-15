import { server } from "websocket";
import http from "http";

const createWebSocket = async () => {
  let connection = null;
  const httpserver = http.createServer((req, res) => {
    console.log("server created");
  });

  const websocket = new server({
    httpServer: httpserver,
  });

  websocket.on("request", (request) => {
    connection = request.accept(null, request.origin);
    connection.on("ping", (e) => console.log("Connection open"));
  });
};

export default createWebSocket;
