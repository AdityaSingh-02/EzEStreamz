import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json());

const httpServer = app.listen(8080);
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", async (ws, req) => {
  console.log("connected to websocket hii");
  ws.on("message", (message) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
