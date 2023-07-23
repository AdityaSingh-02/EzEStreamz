import { IWebSocketInit } from "./webSocket";

async function createClientRTC(data: IWebSocketInit) {
  const ws = new WebSocket("ws://localhost:3001");
  const { call, email, name, rid }: IWebSocketInit = data;
  ws.onopen = () => {
    console.log("Connected.");
    // You can send messages here, as the connection is now open.
    ws.send(call);
  };

  ws.onmessage = (message) => {
    // console.log(`Received message: ${message.data}`);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

export default createClientRTC;
