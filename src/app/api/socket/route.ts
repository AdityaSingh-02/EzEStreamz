import {Server} from "socket.io"


export const GET = async (req:any,res:any) => {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect",(socket) => {
        socket.on("send-message",(obj) => {
            io.emit("recieve-message", obj);
        })
    })
    console.log("Setting Socket");
    res.end();
}