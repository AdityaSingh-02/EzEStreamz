'use client';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ISocketContext {
	socket: any | null;
}

const WebSocketContext = createContext<ISocketContext>({
	socket: null,
});

export const WebSocketProvider = ({ url, children }: { url: string; children: ReactNode }) => {
	const [socket, setSocket] = useState<any>(null);

	useEffect(() => {
		const newSocket = new WebSocket(url);

		setSocket(newSocket);
		return () => {
			newSocket.close();
		};
	}, [url]);

	return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
