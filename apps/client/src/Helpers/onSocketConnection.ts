import {Socket, Server} from 'socket.io'

export default (io:any, socket: Socket) => {
    const createdMessage = (msg:any) => {
      console.log("New message", msg);
      socket.broadcast.emit("newIncomingMessage", msg);
    };
  
    socket.on("createdMessage", createdMessage);
};