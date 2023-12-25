const express = require("express");
import WebSocket from "ws";
import WebSocketFunction from "./websocket";
import uuidv4 from "./uid";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello world");
});

app.get("/api", (req: any, res: any) => {
  try {
    // WebSocketFunction();
    const ws = new WebSocket("ws://localhost:7071/ws");
    ws.emit("get-messages", { message: "hello" });
  } catch (error) {
    console.log("err");
  }
});

app.listen(8080);

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
