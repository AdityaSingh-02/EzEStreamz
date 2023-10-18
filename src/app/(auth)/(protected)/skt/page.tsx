'use client';
import React, { useEffect } from 'react';
import { useSocket } from '@/Context';
import { io } from 'socket.io-client';

const page = () => {
	const socketInit = async () => {
		await fetch('api/socket/io');
		let socket = io({
			path: '/api/socket_io/',
		});
		socket.emit('join-room', { rid: '1', emailId: 'aditya@2002' });
	};

	useEffect(() => {
		// socketInit();
	}, []);
	return (
		<>
			<div>
				<button>click me</button>
			</div>
		</>
	);
};

export default page;
