import uuidv4 from "../uid";
import WebSocket from "ws";

const WebSocketFunction = async () => {
  const sockserver = new WebSocket.Server({ port: 7071 });

  const clients = new Map();

  sockserver.on("connection", (ws: any) => {
    console.log("New client connected!");
    ws.send("connection established");
    ws.on("close", () => console.log("Client has disconnected!"));
    ws.on("message", (data: any) => {
      console.log("data");
    });
    ws.onerror = function () {
      console.log("websocket error");
    };
  });
};

export default WebSocketFunction;
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
