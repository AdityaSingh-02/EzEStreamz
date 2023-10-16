'use client';
import { usePeer } from '@/Context/usePeer';
import { useVideo, useUserContext } from '@/Context';
import React, { useCallback, useEffect, useState } from 'react';
import type { IWebSocketInit } from '@/types/socketData';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';

const Room = () => {
	const [user2, setUser2] = useState('');
	const [myVideo, setMyVideo] = useState<MediaStream>();
	const { videoStatus, setVideoStatus } = useVideo();
	const { createOffer } = usePeer();
	const { user } = useUserContext();

	const pathName: string = usePathname()!;
	const rid = pathName.split('/')[2];

	useEffect(() => {
		user.user2 ? setUser2(user.user2) : null;

		if (videoStatus) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => setMyVideo(res));
		} else {
			closeVideoStream();
		}
	}, [videoStatus, user, user2]);

	// Handles Video Closing
	const closeVideoStream = () => {
		if (myVideo) {
			myVideo.getTracks().forEach((track) => track.stop());
			setMyVideo(undefined);
		}
	};

	const toggleMyVideo = () => {
		setVideoStatus(!videoStatus);
	};

	const handleJoins = useCallback(async () => {
		const offer = await createOffer();
		// Creating Room and sending data
		// Todo add socket methods
	}, [createOffer]);

	// Todo - add client connection/ rm it
	const createClientConnection = async (data: IWebSocketInit) => {
		// const ws = new WebSocket('ws://localhost:3001');
		// const { call, email, name, rid }: IWebSocketInit = data;
		// ws.onopen = () => {
		// 	ws.send(call);
		// };

		// ws.onmessage = async (message) => {};

		// ws.onclose = () => {
		// 	console.log('WebSocket connection closed.');
		// };

		// ws.onerror = (error) => {
		// 	console.error('WebSocket error:', error);
		// };
	};

	return (
		<>
			<div className='flex w-[100%] items-center h-screen '>
				<div className='w-[70%] flex justify-center items-center border-2 border-gray-800 h-[80%] rounded-2xl m-10'>
					<ReactPlayer url={myVideo} playing muted height={500} width={800} />
				</div>
				<div className='w-[30%] flex flex-col justify-between py-10 border-2 px-7 border-gray-800 h-[90%] m-10 rounded-2xl'>
					<div className='border-2 border-red-400 h-[30%] rounded-2xl flex justify-center items-center'>MyVideo</div>
					<div className='border-2 border-red-400 h-[50%] rounded-2xl flex justify-center items-center'>Details : WIP BETA</div>
					<div className=' flex justify-center '>
						<button
							onClick={toggleMyVideo}
							className={`px-4 py-2 flex justify-center rounded-md ${videoStatus ? 'bg-red-500' : 'bg-green-500'} mx-2 text-xl`}
						>
							{videoStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Room;
