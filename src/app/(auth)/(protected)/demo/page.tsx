"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { usePeer } from "@/Context/usePeer";
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
      call: "join",
      email: "asd",
      name: "aditya",
      rid: "123",
    };
    axios.post("/api/v1/create", data).then((res: any) => {
      if (res.status === 200) {
        axios.post("api/v1/rtcConnection", data);
      }
    });
  };

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
