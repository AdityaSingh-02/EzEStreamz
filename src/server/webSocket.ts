const { Server } = require("ws");

export interface IWebSocketInit {
  call: string;
  email: string;
  name?: string;
  rid: string;
  offer?: any;
}

export const webSocketInit = async (client: IWebSocketInit) => {
  const socketServer = new Server({ port: 3001 });
  const { call, email, name, rid, offer } = client;
  // Stores Email and ws(socketId) -> for email to socket mapping
  const emailToSocketMap = new Map();
  // Stores ws and Email id of the first user -> for socket to Email mapping
  const socketToEmailMap = new Map();

  socketServer.on("connection", (ws: any) => {
    console.log("connected");
    // Gets message from the client and message contains method name;
    ws.on("message", (message: any) => {
      if (message == "join") {
        console.log(`joined ${name}`);
        ws.send("Join hua")

        if (!emailToSocketMap.has(rid)) {
          emailToSocketMap.set(rid, []);
        }

        emailToSocketMap.get(rid).push({ email, ws });
        socketToEmailMap.set(ws, email);

        // Broadcasting to everyone in the room except the sender
        const connectionsInRoom = emailToSocketMap.get(rid);
        for (const {
          ws: connection,
          email: connectedEmail,
        } of connectionsInRoom) {
          connection.send(JSON.stringify({ type: "new-user", email }));
          if (connectedEmail !== email) {
          }
        }
      } else if (message == "call-user") {
        const fromEmail = socketToEmailMap.get(ws);
        const socketId = emailToSocketMap.get(email);
        ws.send(JSON.stringify({ type: "call-made", offer, socketId }));
      }
    });
  });
};
