const express = require("express");
import WebSocket from "ws";
import WebSocketFunction from "./websocket";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello world");
});

app.get("/api", (req: any, res: any) => {
  try {
    WebSocketFunction();
    function connectToServer() {
        const ws = new WebSocket("ws://localhost:7071/ws");
        console.log("ws");

      }(connectToServer());
  } catch (error) {
    console.log("err")
  }
});

app.listen(8080);
