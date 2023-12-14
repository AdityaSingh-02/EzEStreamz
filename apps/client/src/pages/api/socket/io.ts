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
			io.to(rid).emit('user-joined', { rid, emailId, id: skt.id }); // works as broadcast
			skt.join(rid);
			skt.emit('joined-room', { rid });
			io.to(skt.id).emit('join-room', data);
			// skt.broadcast.to(rid).emit('user-joined', { rid, emailId, id: skt.id });
		});

		skt.on('call-user', (data) => {
			const { emailId, offer } = data;
			const fromEmail = socketIdToEmailMAP.get(skt.id);
			const sktID = emailToSocketIdMAP.get(emailId);
			io.to(skt.id).emit('incomming-call', { from: sktID, offer, fromEmail });
		});

		skt.on('call-accepted', (data: any) => {
			const { to, ans } = data;
			const email = socketIdToEmailMAP.get(to);
			io.to(to).emit('call-accepted', { from: skt.id, ans, email });
		});
	});

	console.log('Socket server started successfully!');
	res.end();
}
