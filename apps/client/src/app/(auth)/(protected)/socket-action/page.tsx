// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// let socket:any;

// export default function Socket() {
//   const [value, setValue] = useState("");

//   const socketInitializer = async () => {
//     // We call this just to make sure we turn on the websocket server
//     await fetch("/api/socket/io");

//     socket = io({
//       path: "/api/socket_io/",
//     });

//     socket.on("connect", () => {
//       console.log("Connected", socket.id);
//     });

//     socket.on("newIncomingMessage", (msg) => {
//       console.log("New message in client", msg);
//       setValue(msg);
//     });
//   };

//   const sendMessageHandler = async (e) => {
//     if (!socket) return;
//     const value = e.target.value;
//     socket.emit("createdMessage", value);
//   };

//   useEffect(() => {
//     socketInitializer();
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">
//       <p>
//         In the console & network tabs, you can see the issue that on the latest
//         next.js canary its not able to connect to socket.io server.
//       </p>
//       <p>
//         But it will start working if we switch back to 13.2.5-canary.26 version
//         or lower version.
//       </p>
//       <input
//         value={value}
//         onChange={sendMessageHandler}
//         className="w-full h-12 px-2 mt-auto rounded"
//         placeholder="Enter some text and see the syncing of text in another tab"
//       />
//     </main>
//   );
// }

