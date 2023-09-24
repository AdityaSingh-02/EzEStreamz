'use client';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
// import io from 'socket.io-client';

const Home = () => {
	const [input, setInput] = useState('');
	// const [socket, setSocket] = useState<any>(undefined);
	let socket: any;
	useEffect(() => {
		// const socketIo = io('/api/socket/io');
		// setSocket(socketIo);
		socketInitializer();
	}, []);

	// const socketInitializer = async () => {
	// 	socket.emit("send-message", )
	// };

	const socketInitializer: any = async () => {
		await fetch('/api/socket/io');
		socket = io();
		socket.on('connect', () => {
			console.log('connected');
		});

		socket.on('recieve-message', (data: any) => {
			console.log(data);
		});

		socket.on('update-input', (msg: any) => {
			setInput(msg);
		});
	};

	const onChangeHandler = (e: any) => {
		setInput(e.target.value);
		socket.emit('send-message', e.target.value);
	};

	return <input placeholder='Type something' value={input} onChange={onChangeHandler} />;
};

export default Home;
