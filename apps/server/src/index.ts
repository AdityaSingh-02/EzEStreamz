const express = require("express");
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws, req) => {
    ws.on("message", (message) => {
        console.log("received: %s", message);
        ws.send(`Hello, you sent -> ${message}`);
    });
});

app.get("/", (req:any, res:any) => {
    res.json({msg: "server ok"})
})

server.listen(port);