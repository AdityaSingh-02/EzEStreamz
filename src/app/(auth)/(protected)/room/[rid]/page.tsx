"use client";
import { usePeer } from "@/Context/usePeer";
import { useUserContext } from "@/Context";
import React, { useCallback, useEffect, useState } from "react";
import type { IWebSocketInit } from "@/types/socketData";
// import Router from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

const Room = () => {
  const { peer, createOffer, createAnswer } = usePeer();
  const [user2, setUser2] = useState("");

  const pathName = usePathname();
  const rid = pathName.split("/")[2];
  // This is UserData Context
  const { user } = useUserContext();

  useEffect(() => {
    user.user2 ? setUser2(user.user2) : null;
    if (user2 !== "") {
      handleJoins();
    }
  }, [user, user2]);

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

    ws.onmessage = async (message) => {
      // const d = JSON.parse(message.data);
      // console.log(d);
      // await createAnswer(d);
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
      <div className="flex w-[100%] items-center h-screen ">
        <div className="w-[70%] flex justify-center items-center border-2 border-red-500 h-[90%] rounded-2xl m-10">Video</div>
        <div className="w-[30%] flex justify-center items-center border-2 border-red-500 h-[90%] m-10 rounded-2xl">
          <div>my-vide</div>
          <div>Control </div>
        </div>
      </div>
    </>
  );
};

export default Room;
