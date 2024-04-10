'use client';

import { useVideo, useUserContext, useSocket, usePeer } from '@/Context';
import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { configuration } from '@/lib/iceserver/iceserver';
import registerPeerConnectionLintners from '@/peerconnection/peerconnection';

const Room = () => {
	const [myVideo, setMyVideo] = useState<MediaStream>();
	const [remoteEmailId, setRemoteEmailId] = useState();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	const { videoStatus, setVideoStatus } = useVideo();
	const { user } = useUserContext();
	let peerConnection: RTCPeerConnection;
	let localStream: any;
	const pathName: string = usePathname()!;
	const rid = pathName.split('/')[2];

	// Handles Video Closing
	const closeVideoStream = () => {
		if (myVideo) {
			myVideo.getTracks().forEach((track) => track.stop());
			setMyVideo(undefined);
		}
	};
	let flag = false;
	let data: any;
	const createRoom = async() => {
		peerConnection = new RTCPeerConnection(configuration);
		registerPeerConnectionLintners(peerConnection);

		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);

		const roomWithOffer = {
			offer: {
				type: offer.type,
				sdp: offer.sdp
			}
		}
		data = roomWithOffer;
		const roomId = rid;
		if(!peerConnection.currentRemoteDescription && data.answer){
			const ans = new RTCSessionDescription(data.answer);
			await peerConnection.setRemoteDescription(ans);
		}

		localStream.getTrack().forEach((track: any) => {
			peerConnection.addTrack(track, localStream);
		});
	};

	const joinRoom = async() => {
		const offer = data.offer;
		await peerConnection.setRemoteDescription(offer);
		const answer = await peerConnection.createAnswer();
		await peerConnection.setLocalDescription(answer);

		const roomWithAnswer = {
			answer:{
				type: answer.type,
				sdp: answer.sdp
			}
		}
		data = roomWithAnswer;
		flag = true;
	};

	const sendStream = {};

	const handleCallAccepted = {};

	const toggleMyVideo = () => {
		setVideoStatus(!videoStatus);
	};

	const sendVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
			setMyVideo(res);
		});
	};

	return (
		<>
			<div className='flex w-[100%] items-center h-screen '>
				<div className='w-[70%] flex justify-center items-center border-2 border-gray-800 h-[80%] rounded-2xl m-10'>
					{/* <h2>Connected to {remoteEmailId}</h2> */}
					{remoteStream && <ReactPlayer url={myVideo} playing muted height={500} width={800} />}
				</div>
				<div className='w-[30%] flex flex-col justify-between py-10 border-2 px-7 border-gray-800 h-[90vh] m-10 rounded-2xl'>
					<div className='border-2 border-red-400 h-[250px] rounded-2xl flex justify-center items-center'>
						<ReactPlayer url={myVideo} playing muted height={240} width={800} />
					</div>
					<div className='border-2 border-red-400 h-[400px] rounded-2xl flex justify-center items-center'>Details : coming soon...</div>
					<div className=' flex justify-center '>
						{/* <button
							onClick={toggleMyVideo}
							className={`px-4 py-2 flex justify-center rounded-md ${videoStatus ? 'bg-red-500' : 'bg-green-500'} mx-2 text-xl`}
						>
							{videoStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
						</button> */}
						<button onClick={sendVideo}>sendStream</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Room;
