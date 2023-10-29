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
			console.log("This was joinroom Sktid", skt.id);
			console.log("Join-room from email -> ", emailId);
			skt.join(rid);
			skt.emit('joined-room', { rid });
			// skt.broadcast.to(rid).emit('user-joined', { rid, emailId });
			io.to(rid).emit('user-joined', { rid, emailId });
		});

		skt.on('call-user', (data) => {
			const { emailId, offer } = data;
			const fromEmail = socketIdToEmailMAP.get(skt.id);
			const sktID = emailToSocketIdMAP.get(emailId);
			console.log("actual SKT>ID was ----------> ", skt.id);
			console.log("This was calluser Sktid", sktID);
			console.log("call user from Emial -> ",fromEmail);
			// skt.to(skt.id).emit('incomming-call', { from: fromEmail, offer });
			io.to(skt.id).emit('incomming-call', { from: fromEmail, offer });
		});

		skt.on('call-accepted', (data: any) => {
			const { emailId, ans } = data;
			const socketId = emailToSocketIdMAP.get(emailId);
			console.log("This was callaccepted Sktid", skt.id);
			// skt.to(socketId).emit('call-accepted', { ans });
			io.to(socketId).emit('call-accepted', { ans });
		});
	});

	console.log('Socket server started successfully!');
	res.end();
}
