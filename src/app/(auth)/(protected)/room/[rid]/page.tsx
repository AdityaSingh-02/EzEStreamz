"use client";
import { usePeer } from "@/Context/usePeer";
import { useUserContext } from "@/Context";
import React, { useCallback, useEffect, useState } from "react";
import type { IRoomUsers } from "@/types/IRoomUsers";
import type { IWebSocketInit } from "@/types/socketData";
// import Router from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

const Room = (props: IRoomUsers) => {
  const { peer, createOffer, createAnswer } = usePeer();
  const [name, setName] = useState("");
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
      console.log(`Received message: ${message.data}`);
      await createAnswer(message.data);
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
      <div>Room {name}</div>
    </>
  );
};

export default Room;
