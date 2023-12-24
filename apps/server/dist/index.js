"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ws_1 = __importDefault(require("ws"));
const websocket_1 = __importDefault(require("./websocket"));
const app = express();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/api", (req, res) => {
    try {
        (0, websocket_1.default)();
        function connectToServer() {
            const ws = new ws_1.default("ws://localhost:7071/ws");
            console.log("ws");
        }
        (connectToServer());
    }
    catch (error) {
        console.log("err");
    }
});
app.listen(8080);
