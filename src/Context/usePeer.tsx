import React, { createContext, useContext, useMemo } from "react";

const PeerContext = createContext<any>(null);

export const usePeer = () => {
  const data = useContext(PeerContext);
  return data;
};

export const PeerProvider = (props: any) => {
  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  };

  const peer = useMemo<any>(() => new RTCPeerConnection(servers), []);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  return (
    <PeerContext.Provider value={{ peer, createOffer, createAnswer }}>
      {props.children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
