'use client';
import React, { useEffect, useState, useRef } from 'react';
import useSocket from '@/hooks/useSocket';

export interface IMessage {
	type: string;
	payload: {
		remoteSdp: RTCSessionDescriptionInit;
		candidate?: RTCIceCandidateInit;
		type?: 'sender' | 'receiver';
	};
}

const Room = () => {
	const videoRef1 = useRef<HTMLVideoElement | null>(null);
	const videoRef2 = useRef<HTMLVideoElement | null>(null);
	const [pc, setPc] = useState<RTCPeerConnection | null>(null);
	const socket = useSocket();


	useEffect(() => {
		if (!socket) return;

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					type: 'sender',
				}),
			);
		};

		socket.onmessage = async (event) => {
			const message: IMessage = JSON.parse(event.data);
			console.log("This is message", message);

			if (message.type === 'create-answer' && pc) {
				console.log("Answer from receiver - ", message.type)
				await pc.setRemoteDescription(new RTCSessionDescription(message.payload.remoteSdp));
			} else if (message.type === 'ice-candidate' && pc) {
				await pc.addIceCandidate(new RTCIceCandidate(message.payload.candidate));
			}
		}
	}, [socket]);

	const sendStream = () => {
		if (!socket) return;
		const pc = new RTCPeerConnection();
		setPc(pc);
		pc.onnegotiationneeded = async () => {
			const offer = await pc.createOffer();
			await pc.setLocalDescription(new RTCSessionDescription(offer));
			socket.send(JSON.stringify({
				type: 'create-offer',
				payload: {
					remoteSdp: pc.localDescription,
				},
			}),
			);
		};

		pc.onicecandidate = (event) => {
			if (event.candidate) {
				socket?.send(JSON.stringify({
					type: 'ice-candidate',
					payload: {
						candidate: event.candidate,
					},
				}),
				);
			}
		};
		getCameraStreamAndSend(pc);
	};

	const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			if (videoRef1.current) {
				videoRef1.current.srcObject = stream;
				videoRef1.current.play();
			}
			stream.getTracks().forEach((track) => {
				pc?.addTrack(track);
			});
		});

		pc.ontrack = (event: RTCTrackEvent) => {
			console.log("this is video event", event);
			if (videoRef2.current) {
				videoRef2.current.srcObject = new MediaStream([event.track]);
				videoRef2.current.play();
			}
		}
	}


	return (
		<>
			<video ref={videoRef1}></video>
			<video ref={videoRef2}></video>
			<button onClick={sendStream}>Send video</button>
		</>
	);
};

export default Room;
