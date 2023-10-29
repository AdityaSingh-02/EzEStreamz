'use client';

import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from 'react';

const PeerContext = createContext<any>(null);

export const usePeer = () => {
	const data = useContext(PeerContext);
	return data;
};

export const PeerProvider = (props: any) => {
	const [remoteStream, setRemoteStream] = useState<MediaStream>();

	const servers: RTCConfiguration = {
		iceServers: [
			{
				urls: [
					'stun:global.stun.twilio.com:3478',
					'stun:stun.l.google.com:19302',
					'stun:stun1.l.google.com:19302',
					'stun:stun2.l.google.com:19302',
				],
			},
		],
	};

	const peer = useMemo<RTCPeerConnection>(() => new RTCPeerConnection(servers), []);

	const createNewOffer = async () => {
		const offer = await peer.createOffer();
		await peer.setLocalDescription(offer);
		return offer;
	};

	const createNewAnswer = async (offer: any) => {
		await peer.setRemoteDescription(new RTCSessionDescription(offer));
		const answer = await peer.createAnswer();
		await peer.setLocalDescription(new RTCSessionDescription(answer));
		return answer;
	};

	const setRemoteAns = async (ans: any) => {
		await peer.setLocalDescription(ans);
		await peer.setRemoteDescription(new RTCSessionDescription(ans));
	};

	const sendStream = async (stream: MediaStream) => {
		stream.getTracks().forEach((track) => {
			peer.addTrack(track, stream);
		});
	};

	const handleTrackEvent = useCallback((e: any) => {
		const streams = e.streams;
		setRemoteStream(streams[0]);
	}, []);

	useEffect(() => {
		peer.addEventListener('track', handleTrackEvent);
		return () => {
			peer.removeEventListener('track', handleTrackEvent);
		};
	}, [peer, handleTrackEvent]);

	return (
		<PeerContext.Provider value={{ peer, createNewOffer, createNewAnswer, setRemoteAns, sendStream, remoteStream }}>
			{props.children}
		</PeerContext.Provider>
	);
};

export default PeerProvider;
