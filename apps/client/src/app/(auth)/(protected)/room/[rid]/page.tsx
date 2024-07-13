'use client';

import { useVideo, useUserContext, usePeer } from '@/Context';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import useSocket from '@/hooks/useSocket';

const Room = () => {
	const [localStream, setLocalStream] = useState<MediaStream>();
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	const { videoStatus, setVideoStatus } = useVideo();
	const { user } = useUserContext();
	const pathName: string = usePathname()!;
	const rid = pathName.split('/')[2];

	const videoRef1 = useRef<HTMLVideoElement | null>(null);
	const videoRef2 = useRef<HTMLVideoElement | null>(null);

	// Handles Video Closing
	const closeVideoStream = () => {
		if (localStream) {
			localStream.getTracks().forEach((track) => track.stop());
			setLocalStream(undefined);
		}
	};

	const toggleMyVideo = () => {
		setVideoStatus(!videoStatus);
	};

	const sendVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
			setLocalStream(res);
		});
	};

	const offerOptions = {
		offerToReceiveAudio: 1,
		offerToReceiveVideo: 1,
	};

	const call = async () => {
		const videoTrack = localStream?.getVideoTracks()[0];
		const audioTrack = localStream?.getAudioTracks()[0];
	};

	
	const socket = useSocket();
	const senderSide = ()=>{
		if(!socket) return;

		socket.onopen = ()=>{
			socket.send(JSON.stringify({
				type: "sender"
			}))
		}
	}


	return (
		// <>
		// 	<div className='flex w-[100%] items-center h-screen '>
		// 		<div className='w-[70%] flex justify-center items-center border-2 border-gray-800 h-[80%] rounded-2xl m-10'>
		// 			{/* <h2>Connected to {remoteEmailId}</h2> */}
		// 			{remoteStream && <ReactPlayer url={localStream} playing muted height={500} width={800} />}
		// 		</div>
		// 		<div className='w-[30%] flex flex-col justify-between py-10 border-2 px-7 border-gray-800 h-[90vh] m-10 rounded-2xl'>
		// 			<div className='border-2 border-red-400 h-[250px] rounded-2xl flex justify-center items-center'>
		// 				<ReactPlayer url={localStream} playing muted height={240} width={800} />
		// 			</div>
		// 			<div className='border-2 border-red-400 h-[400px] rounded-2xl flex justify-center items-center'>Details : coming soon...</div>
		// 			<div className=' flex justify-center '>
		// 				{/* <button
		// 					onClick={toggleMyVideo}
		// 					className={`px-4 py-2 flex justify-center rounded-md ${videoStatus ? 'bg-red-500' : 'bg-green-500'} mx-2 text-xl`}
		// 				>
		// 					{videoStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
		// 				</button> */}
		// 				<button onClick={sendVideo}>sendStream</button>
		// 			</div>
		// 		</div>
		// 	</div>
		// </>
		<>
			<video ref={videoRef1}></video>
			<video ref={videoRef2}></video>
			<button>Send video</button>
			<button>receive video</button>
		</>
	);
};

export default Room;
