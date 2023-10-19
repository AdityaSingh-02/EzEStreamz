import { Server } from "socket.io";
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

  const emailToSocketIdMAP = new Map();
  const socketIdToEmailMAP = new Map();

  io.on("connection", (skt)=>{
    skt.on("join-room",(data)=>{
      const {rid, emailId} = data;
      console.log("user", emailId, "joined",rid);
      emailToSocketIdMAP.set(emailId, skt.id);
      socketIdToEmailMAP.set(skt.id, emailId);
      skt.join(rid);
      skt.broadcast.to(rid).emit('user-joined',{emailId});
    })
  });

  console.log("Socket server started successfully!");
  res.end();
}