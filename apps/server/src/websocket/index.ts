import uuidv4 from "../uid";
import WebSocket from "ws";

const WebSocketFunction = async () => {
  const wss = new WebSocket.Server({ port: 7071 });
  wss.on("connection", (ws: any) => {
    console.log("Someone connected");
    ws.on("message", (message: any) => {
      console.log("message: %s", message);
      ws.send(`Hello from server, you sent -> ${message}`);
    });

    ws.on("get-messages", (message: any) => {
      console.log(message);
      ws.send("Hello from server, you sent -> ", message);
    });

    ws.on("close", () => {
      console.log("Someone disconnected");
    });
    console.log("wss up");
  });
};

export default WebSocketFunction;
