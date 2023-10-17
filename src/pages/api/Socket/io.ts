import { Server } from "socket.io";
import onSocketConnection from "@/Helpers/onSocketConnection";
import type {NextApiResponseServerIO} from "@/types/SocketIO"

export default function handler(req:any, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log("Server already started!");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    // @ts-ignore
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  // const onConnection = (socket: any) => {
  //   console.log("New connection", socket.id);
  //   onSocketConnection(io, socket);
  // };

  io.on("connection", (skt)=>{
    skt.on("join-room",(data)=>{
      const {rid, emailId} = data;
    })
  });

  console.log("Socket server started successfully!");
  res.end();
}