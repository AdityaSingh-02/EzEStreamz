'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';

interface ISocketContext {
	socket: any | null;
	isConnected?: boolean;
}

const SocketContext = createContext<ISocketContext>({
	socket: null,
	isConnected: false,
});

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socket = useMemo(
		() =>
			io({
				path: "/api/socket/io",
				
				addTrailingSlash: false,
			}),
		[],
	);

	// const [socket, setSocket] = useState(null);
	// const [isConnected, setIsConnected] = useState(false);

	// useEffect(() => {
	// 	const socketInstance = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
	// 		path: '/api/socket/io',
	// 		addTrailingSlash: false,
	// 	});

	// 	socketInstance.on('connect', () => {
	// 		setIsConnected(true);
	// 	});

	// 	socketInstance.on('disconnect', () => {
	// 		setIsConnected(false);
	// 	});

	// 	setSocket(socketInstance);

	// 	return () => {
	// 		socketInstance.disconnect();
	// 	};
	// }, []);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
