import { Server, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'http';

export type NextApiResponseServerIO = NextApiResponse & {
	socket: Socket & {
		server: Server & {
			io: SocketIOServer;
		};
	};
};
