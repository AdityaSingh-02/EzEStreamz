import { NextRequest, NextResponse } from 'next/server';

import { Server } from 'socket.io';

export const GET = async (res: any) => {
	const io = new Server(res.socket.server);
	res.socket.server.io = io;
	io.on('connection', (socket) => {
		socket.on('send-message', (obj) => {
			io.emit('recieve-message', obj);
		});
	});

	console.log('Connected');
	res.end();
};
