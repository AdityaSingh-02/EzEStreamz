import {Server} from 'socket.io'

const SocketIoHandler = (req: any, res: any) =>{
    if(res.socket.server.io){
        console.log("Socket is already running")
    }else{
        console.log("Socket is initialized");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
    }
    res.end();
}

export default SocketIoHandler;