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
				path: '/api/socket/io',
				addTrailingSlash: false,
			}),
		[],
	);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
