"use client";
import { usePeer } from "@/Context/usePeer";
import { useUserContext } from "@/Context";
import React, { useCallback, useEffect, useState } from "react";
import type { IRoomUsers } from "@/types/IRoomUsers";
import type { IWebSocketInit } from "@/types/socketData";
// import Router from "next/navigation";
import { usePathname } from "next/navigation";

const Room = (props: IRoomUsers) => {
  const { peer, createOffer } = usePeer();
  const [name, setName] = useState("");
  const [user2, setUser2] = useState("");

  const pathName = usePathname();
  const rid = pathName.split("/")[2];
  // This is UserData Context
  const { user } = useUserContext();

  useEffect(() => {
    handleJoins();
    user.user2 ? setUser2(user.user2) : null;
    if (user2 !== "") {
    }
  }, [user, user2]);

  const handleJoins = useCallback(async () => {
    const offer = await createOffer();
    console.log("offer", rid);
    // const data : IWebSocketInit = {
    //   call: "call-user",
    //   email: user.emailUser1!,
    //   offer,
    // }
  }, [createOffer]);

  return (
    <>
      <div>Room {name}</div>
    </>
  );
};

export default Room;
