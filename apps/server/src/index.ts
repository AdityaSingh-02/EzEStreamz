import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

interface IMessage {
  type: string;
  payload: {
    remoteSdp: RTCSessionDescription;
    candidate: RTCIceCandidateInit;
    type: "sender" | "receiver";
  };
}

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (data) => {
    const message: IMessage = JSON.parse(data.toString());

    console.log("this was message data + ", message.type);

    switch (message.type) {
      case "sender":
        console.log("Sender")
        senderSocket = ws;
        break;

      case "receiver":
        console.log("receiver")
        receiverSocket = ws;
        break;

      case "create-offer":
        if ((ws === senderSocket) && receiverSocket) {
          console.log("Offer from sender")
          receiverSocket.send(JSON.stringify({
            type: "create-offer",
            payload: {
              remoteSdp: message.payload.remoteSdp
            }
          }))
        }

        if ((ws === receiverSocket) && senderSocket) {
          console.log("Offer from receiver")
          senderSocket.send(JSON.stringify({
            type: "create-offer",
            payload: {
              remoteSdp: message.payload.remoteSdp
            }
          }))
        }
        break;

      case "create-answer":
        if (ws === senderSocket && receiverSocket) {
          console.log("ans from sender")
          receiverSocket.send(JSON.stringify({
            type: "create-answer",
            payload: {
              remoteSdp: message.payload.remoteSdp
            }
          }))
        }
        if (ws === receiverSocket && senderSocket) {
          console.log("ans from receiver")
          senderSocket.send(JSON.stringify({
            type: "create-answer",
            payload: {
              remoteSdp: message.payload.remoteSdp
            }
          }))
        }
        break;

      case "ice-candidate":
        const target = ws === senderSocket ? senderSocket : receiverSocket;
        if (target && message.payload.candidate) {
          target.send(JSON.stringify({
            type: "ice-candidate",
            payload: {
              candidate: message.payload.candidate
            }
          }))
        }
        break;
    }
  });
});