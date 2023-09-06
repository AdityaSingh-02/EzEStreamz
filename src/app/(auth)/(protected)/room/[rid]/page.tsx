"use client";
import { usePeer } from "@/Context/usePeer";
import { useVideo, useUserContext } from "@/Context";
import React, { useCallback, useEffect, useState } from "react";
import type { IWebSocketInit } from "@/types/socketData";
// import Router from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import ReactPlayer from "react-player";

const Room = () => {
  const [user2, setUser2] = useState("");
  const [myVideo, setMyVideo] = useState<MediaStream>();
  const { videoStatus, setVideoStatus } = useVideo();
  const { createOffer } = usePeer();
  const { user } = useUserContext();

  const pathName = usePathname();
  const rid = pathName.split("/")[2];

  useEffect(() => {
    user.user2 ? setUser2(user.user2) : null;
    // if (user2 !== "") {
    //   handleJoins();
    // }

    if (videoStatus) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((res) => setMyVideo(res));
    } else {
      closeVideoStream();
    }
  }, [videoStatus, user, user2]);

  // Handles Video Closing
  const closeVideoStream = () => {
    if (myVideo) {
      myVideo.getTracks().forEach((track) => track.stop());
      setMyVideo(undefined);
    }
  };

  const toggleMyVideo = () => {
    setVideoStatus(!videoStatus);
  };

  const handleJoins = useCallback(async () => {
    const offer = await createOffer();
    const data: IWebSocketInit = {
      call: "call-user",
      email: user.emailUser1!,
      rid,
      offer,
    };
    // Creating Room and sending data
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
  }, [createOffer]);

  const createClientConnection = async (data: IWebSocketInit) => {
    const ws = new WebSocket("ws://localhost:3001");
    const { call, email, name, rid }: IWebSocketInit = data;
    ws.onopen = () => {
      ws.send(call);
    };

    ws.onmessage = async (message) => {};

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  return (
    <>
      <div className="flex w-[100%] items-center h-screen ">
        <div className="w-[70%] flex justify-center items-center border-2 border-red-500 h-[80%] rounded-2xl m-10">
          <ReactPlayer url={myVideo} playing muted height={500} width={800} />
        </div>
        <div className="w-[30%] flex flex-col justify-center items-center border-2 border-red-500 h-[90%] m-10 rounded-2xl">
          <div>
            <button onClick={toggleMyVideo}>TOGGLE</button>
          </div>
          <div>Control </div>
        </div>
      </div>
    </>
  );
};

export default Room;
