import { UUID } from "crypto";

const { Server } = require("ws");

export interface IWebSocketInit {
  call: string;
  email: string;
  name?: string;
  rid: string;
}

export const webSocketInit = async (client: IWebSocketInit) => {
  const socketServer = new Server({ port: 3001 });
  const { call, email, name, rid } = client;
  const roomConnections = new Map();

  socketServer.on("connection", (ws: any) => {
    console.log("connected");

    ws.on("message", (message: any) => {
      if (message == "join") {

        console.log(`join ${email}`);
        ws.send("joined");

        if (!roomConnections.has(rid)) {
          roomConnections.set(rid, []);
        }

        roomConnections.get(rid).push({ email, ws });

        // Broadcasting to everyone in the room except the sender
        const connectionsInRoom = roomConnections.get(rid);
        for (const {
          ws: connection,
          email: connectedEmail,
        } of connectionsInRoom) {
          if (connectedEmail !== email) {
            connection.send(JSON.stringify({ type: "new-user", email }));
          }
        }
      }
    });
  });

  // const emailToSocketMap = new Map<string, any>();

  // socketServer.on("connection", (ws: any) => {
  //   console.log("connected");

  //   ws.on("message", (message: any) => {
  //     if (message == "join") {
  //       console.log("join ", client.email);
  //       ws.send("joined");
  //       const { email, rid }: IWebSocketInit = client;
  //       emailToSocketMap.set(email, ws.id);
  //       ws.join(rid);
  //       ws.broadcast.to(rid).emit("new-user", { email });
  //     }
  //   });
  // });
};
