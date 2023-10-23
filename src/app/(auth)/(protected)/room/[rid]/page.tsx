'use client';
import { usePeer } from '@/Context/usePeer';
import { useVideo, useUserContext, useSocket } from '@/Context';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';

const Room = () => {
	const [myVideo, setMyVideo] = useState<MediaStream>();
	const { videoStatus, setVideoStatus } = useVideo();
	const { createOffer } = usePeer();
	const { user } = useUserContext();

	const pathName: string = usePathname()!;
	const rid = pathName.split('/')[2];

	const { socket } = useSocket();

	useEffect(() => {
		socket.on('user-joined', (data: any) => {
			console.log(data);
		});

		if (videoStatus) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => setMyVideo(res));
		} else {
			closeVideoStream();
		}
	}, [videoStatus, user, socket]);

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
