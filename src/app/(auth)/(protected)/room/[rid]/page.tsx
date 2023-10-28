'use client';

import { useVideo, useUserContext, useSocket, usePeer } from '@/Context';
import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';

const Room = () => {
	const [myVideo, setMyVideo] = useState<MediaStream>();
	const [remoteEmailId, setRemoteEmailId] = useState();
	const { videoStatus, setVideoStatus } = useVideo();
	const { createNewOffer, peer, createNewAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();
	const { user } = useUserContext();
	const { socket } = useSocket();

	const pathName: string = usePathname()!;
	const rid = pathName.split('/')[2];

	// Handles Video Closing
	const closeVideoStream = () => {
		if (myVideo) {
			myVideo.getTracks().forEach((track) => track.stop());
			setMyVideo(undefined);
		}
	};

	const handleNewUserJoined = useCallback(
		async (data: any) => {
			const { emailId } = data;
			const offer = await createNewOffer();
			socket.emit('call-user', { emailId, offer });
			console.log("111")
			setRemoteEmailId(emailId);
		},
		[createNewOffer, socket],
	);

	const handleIncommingCall = useCallback(	//todo- fix - Method Not working
		async (data: any) => {
			const { from, offer } = data;
			const ans = await createNewAnswer(offer);
			socket.emit('call-accepted', { emailId: from, ans });
			console.log("222")
			setRemoteEmailId(from);
		},
		[createNewAnswer, socket],
	);

	const handleCallAccepted = useCallback(
		async (data: any) => {
			const { ans } = data;
			await setRemoteAns(ans);
		},
		[setRemoteAns, socket],
	);

	useEffect(() => {
		socket.on('user-joined', handleNewUserJoined);
		socket.on('incomming-call', handleIncommingCall);
		socket.on('call-accepted', handleCallAccepted);

		if (videoStatus) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
				setMyVideo(res);
				sendStream(res);
			});
		} else {
			closeVideoStream();
		}

		return () => {
			socket.off('user-joined', handleNewUserJoined);
			socket.off('incomming-call', handleIncommingCall);
			socket.off('call-accepted', handleCallAccepted);
		};
	}, [videoStatus, user, socket, handleIncommingCall, handleNewUserJoined, handleCallAccepted, sendStream]);

	const handleNegotiations = useCallback(() => {
		const localOffer = peer.localDescription;
		socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer });
	}, [peer.localDescription, remoteEmailId, socket]);

	useEffect(() => {
		peer.addEventListener('negotiationneeded', handleNegotiations);
		return () => {
			peer.removeEventListener('negotiationneeded', handleNegotiations);
		};
	}, [handleNegotiations]);

	const toggleMyVideo = () => {
		setVideoStatus(!videoStatus);
	};

	const sendVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
			setMyVideo(res);
			sendStream(res);
		});
	};

	return (
		<>
			<div className='flex w-[100%] items-center h-screen '>
				<div className='w-[70%] flex justify-center items-center border-2 border-gray-800 h-[80%] rounded-2xl m-10'>
					<h2>Connected to {remoteEmailId}</h2>
					<ReactPlayer url={remoteStream} playing muted height={500} width={800} />
				</div>
				<div className='w-[30%] flex flex-col justify-between py-10 border-2 px-7 border-gray-800 h-[90vh] m-10 rounded-2xl'>
					<div className='border-2 border-red-400 h-[250px] rounded-2xl flex justify-center items-center'>
						<ReactPlayer url={myVideo} playing muted height={240} width={800} />
					</div>
					<div className='border-2 border-red-400 h-[400px] rounded-2xl flex justify-center items-center'>Details : WIP BETA</div>
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
