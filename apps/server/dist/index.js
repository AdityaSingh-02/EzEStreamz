"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ws_1 = __importDefault(require("ws"));
const app = express();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/api", (req, res) => {
    try {
        // WebSocketFunction();
        const ws = new ws_1.default("ws://localhost:7071/ws");
        ws.emit("get-messages", { message: "hello" });
    }
    catch (error) {
        console.log("err");
    }
});
app.listen(8080);
const wss = new ws_1.default.Server({ port: 7071 });
wss.on("connection", (ws) => {
    console.log("Someone connected");
    ws.on("message", (message) => {
        console.log("message: %s", message);
        ws.send(`Hello from server, you sent -> ${message}`);
    });
    ws.on("get-messages", (message) => {
        console.log(message);
        ws.send("Hello from server, you sent -> ", message);
    });
    ws.on("close", () => {
        console.log("Someone disconnected");
    });
    console.log("wss up");
});
