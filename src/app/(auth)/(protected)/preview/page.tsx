"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { v4 } from "uuid";
import { useVideo } from "@/Context";

const Preview = () => {
  const [video, setVideo] = useState<MediaStream>();
  const [roomId, setRoomId] = useState("");
  const { videoStatus, setVideoStatus } = useVideo();

  let rid = v4().substring(0, 12);
  if (roomId === "") {
    setRoomId(rid);
  }

  useEffect(() => {
    if (videoStatus) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((res) => {
          setVideo(res);
        });
    } else {
      setVideo(undefined);
    }
  }, [videoStatus]);

  const closeVdo = () => {
    setVideoStatus(!videoStatus);
  };

  return (
    <>
      <div className="flex flex-row  justify-around items-center h-screen bg-gradient-to-tr from-blue-500 to-emerald-500">
        <div className="flex rounded-md">
          <ReactPlayer url={video} playing height={800} width={800} />
        </div>
        <div className="flex flex-col space-y-5">
          <h1 className="px-4 py-2 rounded-md bg-black mx-2 text-xl">
            Room Id - {roomId}
          </h1>
          <button className="px-4 py-2 rounded-md bg-gray-500 mx-2 text-xl">
            Join
          </button>
          <button
            onClick={closeVdo}
            className="px-4 py-2 rounded-md bg-gray-500 mx-2 text-xl">
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Preview;
