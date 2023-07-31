'use client';
import {usePeer} from '@/Context/usePeer';
import {useUserContext} from '@/Context'
import React, { useEffect, useState } from 'react'
import type {IRoomUsers} from '@/types/IRoomUsers'


const Room = (props:IRoomUsers) => {
  
  const {peer, createOffer} = usePeer();
  const [name, setName] = useState("");

  const {user} = useUserContext();
  useEffect(() => {
    handleJoins();
  },[]);

  const handleJoins = async () => {
    setName(user.user1);
  }

  return (
    <>
      <div>Room {name}</div>

    </>
  )
}

export default Room