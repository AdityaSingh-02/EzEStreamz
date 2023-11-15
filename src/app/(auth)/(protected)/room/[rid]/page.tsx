'use client';

import { useVideo, useUserContext, useSocket, usePeer } from '@/Context';
import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';

// Test migrate
import peerService from '@/services/peerservice';

const Room = () => {
	const [myVideo, setMyVideo] = useState<MediaStream>();
	const [remoteEmailId, setRemoteEmailId] = useState();
	const { videoStatus, setVideoStatus } = useVideo();
	// const { createNewOffer, peer, createNewAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();
	const { user } = useUserContext();
	const { socket } = useSocket();

	// Test Migration
	const [remoteStream, setRemoteStream] = useState<MediaStream>();
	const [remoteSocketID, setRemoteSocketId] = useState();

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
			const { rid, emailId, id } = data;
			console.log("THHEEE data ", data);
			// test
			const offer = await peerService.getOffer();
			socket.emit('call-user', { emailId, offer });
			console.log('111');
			setRemoteEmailId(emailId);
			setRemoteSocketId(id);
			const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});
			setMyVideo(stream);
		},
		// [createNewOffer, socket],
		[socket],
	);

	const handleIncommingCall = useCallback(
		//todo- fix - Method Not working
		async (data: any) => {
			console.log('222');
			const { from, offer, email } = data;
			console.log("The Data 2",data);
			setRemoteSocketId(from);
			// test
			const ans = await peerService.getAnswer(offer);
			socket.emit('call-accepted', { to: from, ans });
			setRemoteEmailId(email);
			const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});
			setMyVideo(stream);
		},
		// [createNewAnswer, socket],
		[socket],
	);

	const sendStream = useCallback(() => {
		myVideo?.getTracks().forEach((track) => {
			peerService.peer.addTrack(track, myVideo);
		});
	}, [myVideo]);

	const handleCallAccepted = useCallback(
		async (data: any) => {
			const { ans } = data;
			console.log('call accepted', ans);
			// Test-------------
			peerService.setLocalDescription(ans);
			sendStream();
		},
		// [setRemoteAns, socket],
		[peerService.setLocalDescription, socket, myVideo],
	);

	useEffect(() => {
		socket.on('user-joined', handleNewUserJoined);
		socket.on('incomming-call', handleIncommingCall);
		socket.on('call-accepted', handleCallAccepted);

		if (videoStatus) {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
				setMyVideo(res);
				// Test Migration
				// sendStream(res);
			});
		} else {
			closeVideoStream();
		}

		return () => {
			socket.off('user-joined', handleNewUserJoined);
			socket.off('incomming-call', handleIncommingCall);
			socket.off('call-accepted', handleCallAccepted);
		};
		// Test - migration
	}, [videoStatus, user, socket, handleIncommingCall, handleNewUserJoined, handleCallAccepted]);

	const handleNegotiations = useCallback(() => {
		console.log('333');
		// Test migration
		const offer = peerService.getOffer();
		socket.emit('call-user', { emailId: remoteEmailId, offer });
	}, [remoteEmailId, socket]);

	useEffect(() => {
		// Test Migration
		peerService.peer.addEventListener('negotiationneeded', handleNegotiations);
		peerService.peer.addEventListener('track', async (ev) => {
			const stream: any = ev.streams;
			console.log("got stream");
			setRemoteStream(stream[0]);
		});
		return () => {
			peerService.peer.removeEventListener('negotiationneeded', handleNegotiations);
		};
	}, [handleNegotiations]);

	const toggleMyVideo = () => {
		setVideoStatus(!videoStatus);
	};

	const sendVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((res) => {
			// sendStream(res);
			setMyVideo(res);
			sendStream();
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
