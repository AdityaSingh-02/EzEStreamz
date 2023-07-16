import type { IWebSocketInit } from "./webSocket";

async function createClientRTC(data: IWebSocketInit) {
    const ws = new WebSocket("ws://localhost:3001");
    const {method, name, email, rid} = data;
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      // You can send messages here, as the connection is now open.
      ws.send(method!);
    };

    ws.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  export default createClientRTC;