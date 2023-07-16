import { UUID } from "crypto";

const { Server } = require("ws");

export interface IWebSocketInit {
  method?: string;
  email: string;
  name?: string;
  rid: string;
}

export const webSocketInit = async (client?: IWebSocketInit) => {
  const socketServer = new Server({ port: 3001 });

  const emailToSocketMap = new Map<string, any>();

  socketServer.on("connection", (ws: any) => {
    console.log("connected");

    ws.on("message", (message: any) => {
      if (message == "join") {
        console.log("join");
        ws.send("joined");
        // const { name, email, rid }: IWebSocketInit = client as IWebSocketInit;
        // emailToSocketMap.set(email, ws);
        // ws.join(rid);
        // ws.broadcast.to(rid).emit("new-user", { email });
      }
      console.log("out");
      ws.send("outer");
    });
  });
};
