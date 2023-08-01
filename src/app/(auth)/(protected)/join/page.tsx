"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { useVideo } from "@/Context";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import type { IWebSocketInit } from "@/server/webSocket";
import appwriteService, { AppwriteService } from "@/appwrite-service/config";
import axios from "axios";
import { useUserContext } from "@/Context";

const Join = () => {
  const [video, setVideo] = useState<MediaStream>();
  const [rid, setRid] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const { videoStatus, setVideoStatus } = useVideo();

  const { user, addUser } = useUserContext();

  useEffect(() => {
    getUserData();
    if (videoStatus) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((res) => {
          setVideo(res);
        });
    } else {
      closeVideo();
    }
  }, [videoStatus]);

  const getUserData = async () => {
    appwriteService.getUser().then(({ name, email }: any) => {
      setUserInfo({ name, email });
    });
  };

  const closeVideo = () => {
    if (video) {
      video.getTracks().forEach((track) => track.stop());
      setVideo(undefined);
    }
  };

  const toggleCamera = () => {
    setVideoStatus(!videoStatus);
  };

  const joinRoom = async () => {
    if (rid.length == 12) {
      const data: IWebSocketInit = {
        call: "call-user",
        email: userInfo.email,
        name: userInfo.name,
        rid,
      };
      // Forwarding data with help of hook
      addUser({ user2: userInfo.email, emailUser2: userInfo.email, rid });

      // Post Request For extablishing connection and joining room
      axios
        .post("/api/v1/create", data)
        .then(async (res: any) => {
          if (res.status == 200) {
            createClientConnection(data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      return new Error("Room Id is not valid");
    }
  };

  const createClientConnection = async (data: IWebSocketInit) => {
    const ws = new WebSocket("ws://localhost:3001");
    const { call, email, name, rid }: IWebSocketInit = data;
    ws.onopen = () => {
      console.log("Connected.");
      // You can send messages here, as the connection is now open.
      ws.send(call);
    };

    ws.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-start md:justify-around items-center h-screen bg-gradient-to-tr from-blue-500 to-emerald-500">
        <div className="flex max-sm:w-[350px] px-4 max-md:w-[600px] md:px-0">
          <ReactPlayer url={video} playing muted height={500} width={800} />
        </div>
        <div className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Enter Room Id"
            onChange={(e) => setRid(e.target.value)}
            className="px-4 py-2 rounded-lg text-black"
          />
          <button
            aria-label="join"
            onClick={joinRoom}
            className="px-4 py-2 rounded-md bg-gray-500 mx-2 text-xl">
            Join
          </button>
          <button
            onClick={toggleCamera}
            aria-label={`${videoStatus ? "Turn off" : "Turn on"} camera`}
            className={`px-4 py-2 flex justify-center rounded-md ${
              videoStatus ? "bg-red-500" : "bg-gray-500"
            } mx-2 text-xl`}>
            {videoStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
          </button>
          <p className="text-black text-sm mx-auto">
            **Mic is Turned off by default
          </p>
        </div>
      </div>
    </>
  );
};

export default Join;
