'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import useSocket from '@/hooks/useSocket';
import { IMessage } from '../sender/page';

const Room = () => {
    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);
    const socket = useSocket();
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        if (!socket) return;

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    type: 'receiver',
                }),
            );
        };
        const pc = new RTCPeerConnection();
        setPc(pc);

        socket.onmessage = async (event) => {
            const message: IMessage = JSON.parse(event.data);
            console.log("this is message", message);
            if (message.type === 'create-offer') {
                await pc.setRemoteDescription(new RTCSessionDescription(message.payload.remoteSdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(new RTCSessionDescription(answer));
                socket.send(JSON.stringify({
                    type: "create-answer",
                    payload: {
                        remoteSdp: answer
                    }
                }));
            } else if (message.type === 'ice-candidate') {
                pc.addIceCandidate(message.payload.candidate);
            }
        }
        // getCameraStreamAndSend(pc);

    }, [socket]);

    const sendStream = async () => {
        if (!socket) return;
        socket.onmessage = async (event) => {
            const message: IMessage = JSON.parse(event.data);
            console.log("this is message", message);
            if (message.type === 'create-offer' && pc) {
                await pc.setRemoteDescription(message.payload.remoteSdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.send(JSON.stringify({
                    type: "create-answer",
                    payload: {
                        remoteSdp: answer
                    }
                }));
            } else if (message.type === 'ice-candidate' && pc) {
                pc.addIceCandidate(message.payload.candidate);
            }
        }

        if(pc){
            pc.onicecandidate = (e) => {
                if (e.candidate) {
                    socket.send(JSON.stringify({
                        type: "ice-candidate",
                        payload: {
                            candidate: e.candidate
                        }
                    }))
                }
            }
            getCameraStreamAndSend(pc);
        }
    };

    const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef1.current) {
                videoRef1.current.srcObject = stream;
                videoRef1.current.play();
            }
            stream.getTracks().forEach((track) => {
                pc.addTrack(track);
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
