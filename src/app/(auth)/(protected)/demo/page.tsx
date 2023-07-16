"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { usePeer } from "@/Context/usePeer";
import { server, w3cwebsocket } from "websocket";
import type { IWebSocketInit } from "@/server/webSocket";

const Demo = () => {
  const [mySrc, setMySrc] = useState<MediaStream>();
  const [userSrc, setUserSrc] = useState<MediaStream>();
  const { peer, createOffer } = usePeer();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((res) => {
        setMySrc(res);
      });
  }, []);

  const handleclick = async () => {
    // const offer = createOffer();
    const data: IWebSocketInit = {
      email: "asd",
      name: "aditya",
      rid: "123",
    };
    axios
      .post("/api/v1/create")
      .then((res: any) => {
        if (res.status === 200) {
          axios.post('api/v1/demo',{method:"join" ,email: "Hello", name: "adi", rid: "1234" })
        }
      });
  };

  // ("use server");
  // async function createClientRTC() {
  //   const ws = new WebSocket("ws://localhost:3001");

  //   ws.onopen = () => {
  //     console.log("WebSocket connection established.");
  //     // You can send messages here, as the connection is now open.
  //     ws.send("Hello, server!");
  //   };

  //   ws.onmessage = (message) => {
  //     console.log(`Received message: ${message.data}`);
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };

  //   ws.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };
  // }

  return (
    <>
      <div>
        <ReactPlayer url={mySrc} playing />
        <button onClick={handleclick}>Hello</button>
      </div>
    </>
  );
};

export default Demo;
