'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

interface Props {
	children: React.ReactNode;
}

const SocketContext = createContext(null);

export const useSocket = () => {
	return useContext(SocketContext);
}

export const SocketProvider = (props: Props) => {
	const socket = useMemo(
		() =>
			io({
				host: 'localhost',
				port: 3000,
			}),
		[],
	);

	return <SocketContext.Provider value={{ socket }}>{props.children}</SocketContext.Provider>;
};