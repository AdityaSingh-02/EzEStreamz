"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { v4 } from "uuid";
import { useVideo } from "@/Context";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/navigation";
import type { IWebSocketInit } from "@/server/webSocket";
import appwriteService from "@/appwrite-service/config";
import axios from "axios";
import { error } from "console";

const Preview = () => {
  const [video, setVideo] = useState<MediaStream>();
  const [roomId, setRoomId] = useState("");
  const { videoStatus, setVideoStatus } = useVideo();
  const [copy, setCopyStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  // get uuid
  let rid = v4().substring(0, 12);
  if (roomId === "") {
    setRoomId(rid);
  }

  // Manages video on and off state
  useEffect(() => {
    if (videoStatus) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((res) => {
          setVideo(res);
        });
    } else {
      cloaseVideo();
    }
    getUserData();
  }, [videoStatus]);

  // Closes all the tracks
  const cloaseVideo = () => {
    if (video) {
      video.getTracks().forEach((track) => track.stop());
      setVideo(undefined);
    }
  };

  // Turns camera off or on
  const toggleCamera = () => {
    setVideoStatus(!videoStatus);
  };

  // Gets user data from appwrite service
  const getUserData = async () => {
    appwriteService.getUser().then(({ name, email }: any) => {
      setUserInfo({ name, email });
    });
  };

  // Manages user Join Data
  const handleJoinRoom = async () => {
    const data: IWebSocketInit = {
      call: "join",
      email: userInfo.email,
      rid,
      name: userInfo.name,
    };
    axios.post("/api/v1/create", data).then((res: any) => {
      if (res.status === 200) {
        axios.post("api/v1/rtcConnection", data);
      }
    }).catch((error)=> {
      throw new Error(error);
    }).finally(() => {
      router.push(`/room/${rid}`);
    })
  };

  // Function for copying room ID
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopyStatus(true);
      setTimeout(() => {
        setCopyStatus(false);
      }, 1500);
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-start md:justify-around items-center h-screen bg-gradient-to-tr from-blue-500 to-emerald-500">
        <div className="flex max-sm:w-[350px] px-4 max-md:w-[600px] md:px-0">
          <ReactPlayer url={video} playing muted height={500} width={800} />
        </div>
        <div className="flex flex-col space-y-5">
          <h1 className="px-4 py-2 rounded-md bg-black mx-2 text-xl">
            Room Id - {roomId}
            <button
              className="pl-2 transition-all duration-200"
              onClick={copyRoomId}>
              {!copy ? <BiCopy /> : <MdDone color="green" />}
            </button>
          </h1>
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2 rounded-md bg-gray-500 mx-2 text-xl">
            Join
          </button>
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 flex justify-center rounded-md ${
              videoStatus ? "bg-red-500" : "bg-green-500"
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

export default Preview;
