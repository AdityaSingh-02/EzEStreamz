import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIo } from 'socket.io';
import cors from 'cors';
import { NextApiResponseServerIO } from '@/types/SocketIO';

const corsMiddleware = cors();

export const config = {
	api: {
		bodyParser: false,
	},
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
	if (res.socket.server.io) {
		console.log('already running');
		res.end();
		return;
	}
	const path = '/api/socket/io';
	const httpServer: NetServer = res.socket.server as any;
	const io = new ServerIo(httpServer, {
		path,
		addTrailingSlash: false,
	});
	// @ts-ignore
	res.socket.server.io = io;
	io.on('connect', (socket) => {
		const clientID = socket.id;
		console.log('setting up conneciton');
		socket.on('send-message', (obj) => {
			io.emit('recieve-message', obj);
		});

		socket.on('disconnect', () => {
			console.log('Disconnecting Client');
		});
	});
	corsMiddleware(req, res, () => {
		// @ts-ignore
		res.socket.server.io = io;
		res.end();
	});
};

export default ioHandler;
