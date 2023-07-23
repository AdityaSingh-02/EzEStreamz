'use client';
import {usePeer} from '@/Context/usePeer';
import {useIUser} from '@/Context'
import React, { useEffect } from 'react'

const Room = () => {
  const {peer,createOffer} = usePeer();
  const {user} = useIUser();
  useEffect(() => {
    handleJoins();
  },[]);

  const handleJoins = async () => {
    console.log("hey This is ", user.name)
  }

  return (
    <>
      <div>Room</div>
    </>
  )
}

export default Room