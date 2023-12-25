"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const WebSocketFunction = () => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.default = WebSocketFunction;
