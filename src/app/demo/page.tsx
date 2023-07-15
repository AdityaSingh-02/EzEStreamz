"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Demo = () => {
  const [mySrc, setMySrc] = useState<MediaStream>();
  const [userSrc, setUserSrc] = useState<MediaStream>()
  const [peerConnection, setPeerConnection] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  const createOffer = async() => {
    // My device
    let pc = new RTCPeerConnection(servers)
    //  Getting other device
    let rs = new MediaStream();
    
    mySrc?.getTracks().forEach((track) => {
        pc.addTrack(track, mySrc)
    });
    
    pc.ontrack = event => {
        event.streams[0].getTracks().forEach((track)=> {
            rs.addTrack(track)
        })
    }

    pc.onicecandidate = async(event) => {
        if(event.candidate){
            console.log("new ice candidate", event.candidate)
        }
    }
    
    setUserSrc(rs)
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer)
    console.log("offer,", offer)
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((res) => {
        setMySrc(res);
      });

      createOffer();
  }, []);

  const handleclick =async () => {
    axios.post('api/v1/create').then(res => {
        console.log("after post req we get ", res)
    })
  }

  return (
    <>
      <div>
        <ReactPlayer url={mySrc} playing />
        <button onClick={handleclick}>Hello</button>
      </div>
    </>
  );
};

export default Demo;
