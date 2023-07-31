"use client";
import { usePeer } from "@/Context/usePeer";
import { useUserContext } from "@/Context";
import React, { useCallback, useEffect, useState } from "react";
import type { IRoomUsers } from "@/types/IRoomUsers";

const Room = (props: IRoomUsers) => {
  const { peer, createOffer } = usePeer();
  const [name, setName] = useState("");

  // This is UserData Context
  const { user } = useUserContext();

  useEffect(() => {
    handleJoins();
  }, []);

  const handleJoins = useCallback(async () => {
    const offer = await createOffer();
  }, [createOffer]);

  return (
    <>
      <div>Room {name}</div>
    </>
  );
};

export default Room;
