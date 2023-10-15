'use client';
import React, { use, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import {io} from 'socket.io-client'
import axios from 'axios';

// Contexts
import { useVideo, useUserContext, useSocketConnection } from '@/Context';

// Icons
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';

// import type { IWebSocketInit } from '@/server/webSocket';
import appwriteService from '@/appwrite-service/config';

const Preview = () => {
	const [video, setVideo] = useState<MediaStream>(); // Video stream
	const [roomId, setRoomId] = useState(''); // Room ID
	const { videoStatus, setVideoStatus } = useVideo(); // Video on or off
	const [copy, setCopyStatus] = useState(false); // Copy rid status
	// const [ws, setWs] = useState<WebSocket>(new WebSocket('ws://localhost:3001')); // Websocket connection
	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
	}); // User info
  const[ioConnected, setIoConnection] = useState(false); //check for Io API is fetched or not

	const router = useRouter();

  // Using Contexts
	const { addUser } = useUserContext();
	// const { connectionStatus, setConnectionStatus, setURL } = useSocketConnection();

	// gets uuid
	let rid = v4().substring(0, 12);
	if (roomId === '') {
		setRoomId(rid);
	}

	// Manages video on and off state
	useEffect(() => {
		if (videoStatus) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((res) => {
				setVideo(res);
			});
		} else {
			closeVideo();
		}
		getUserData();
	}, [videoStatus]);

	// Closes all the tracks for camera
	const closeVideo = () => {
		if (video) {
			video.getTracks().forEach((track) => track.stop());
			setVideo(undefined);
		}
	};

	// Turns camera off or on
	const toggleCamera = () => {
		setVideoStatus(!videoStatus);
	};

	// Gets user data from appwrite service
	const getUserData = async () => {
		appwriteService.getUser().then(({ name, email }: any) => {
			setUserInfo({ name, email });
		});
	};

	// Function for copying room ID
	const copyRoomId = () => {
		navigator.clipboard.writeText(roomId).then(() => {
			setCopyStatus(true);
			setTimeout(() => {
				setCopyStatus(false);
			}, 1500);
		});
	};

	// Manages user Join Data and Websocket connection
	const handleCreateRoom = async () => {
		// Hook used to store user data
		addUser({ emailUser1: userInfo.email, user1: userInfo.name, rid: roomId });

		// Todo - Add Api call

    if(!ioConnected){
      await fetch("/api/socket/io");
      setIoConnection(!ioConnected);
    }

    const socket = io({
      path: "/api/socket_io"
    });

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

	};

	return (
		<>
			<div className='flex flex-col md:flex-row justify-start md:justify-around items-center h-screen bg-gradient-to-tr bg-gray-950'>
				<div className='flex max-sm:w-[350px] px-4 max-md:w-[600px] md:px-0'>
					<ReactPlayer url={video} playing muted height={500} width={800} />
				</div>
				<div className='flex flex-col space-y-5'>
					<h1 className='px-4 py-2 rounded-md bg-black mx-2 text-xl'>
						Room Id - {roomId}
						<button className='pl-2 transition-all duration-200' onClick={copyRoomId}>
							{!copy ? <BiCopy /> : <MdDone color='green' />}
						</button>
					</h1>
					<button onClick={handleCreateRoom} className='px-4 py-2 rounded-md bg-gray-500 mx-2 text-xl'>
						Join
					</button>
					<button
						onClick={toggleCamera}
						className={`px-4 py-2 flex justify-center rounded-md ${videoStatus ? 'bg-red-500' : 'bg-green-500'} mx-2 text-xl`}
					>
						{videoStatus ? <BsCameraVideoOff /> : <BsCameraVideo />}
					</button>
					<p className='text-white text-sm mx-auto'>**Mic is Turned off by default</p>
				</div>
			</div>
		</>
	);
};

export default Preview;
