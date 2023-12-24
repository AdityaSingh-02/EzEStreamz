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
    const sockserver = new ws_1.default.Server({ port: 7071 });
    const clients = new Map();
    sockserver.on("connection", (ws) => {
        console.log("New client connected!");
        ws.send("connection established");
        ws.on("close", () => console.log("Client has disconnected!"));
        ws.on("message", (data) => {
            console.log("data");
        });
        ws.onerror = function () {
            console.log("websocket error");
        };
    });
});
exports.default = WebSocketFunction;
// wss.on("connection", (ws: any) => {
//   const id = uuidv4();
//   const color = Math.floor(Math.random() * 360);
//   const metadata = { id, color };
//   clients.set(ws, metadata);
//   ws.on("message", (messageAsString: any) => {
//     const message = JSON.parse(messageAsString);
//     const metadata = clients.get(ws);
//     message.sender = metadata.id;
//     message.color = metadata.color;
//     const outbound = JSON.stringify(message);
//     [...clients.keys()].forEach((client) => {
//       client.send(outbound);
//     });
//   });
//   ws.on("close", () => {
//     clients.delete(ws);
//   });
//   console.log("wss up");
// });
