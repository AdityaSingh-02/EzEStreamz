import { Server } from 'socket.io';
import type { NextApiResponseServerIO } from '@/types/SocketIO';

export default function handler(req: any, res: NextApiResponseServerIO) {
	if (res.socket.server.io) {
		res.end();
		return;
	}

	const io = new Server(res.socket.server, {
		path: '/api/socket/io',
		// @ts-ignore
		addTrailingSlash: false,
	});
	res.socket.server.io = io;

	const emailToSocketIdMAP = new Map();
	const socketIdToEmailMAP = new Map();

	io.on('connection', (skt) => {
		skt.on('join-room', (data) => {
			const { rid, emailId } = data;
			console.log('user', emailId, 'joined', rid);
			emailToSocketIdMAP.set(emailId, skt.id);
			socketIdToEmailMAP.set(skt.id, emailId);
			skt.join(rid);
			skt.emit('joined-room', { rid });
			skt.broadcast.to(rid).emit('user-joined', { rid, emailId });
		});
	});

	console.log('Socket server started successfully!');
	res.end();
}
