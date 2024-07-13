import React, { useEffect, useState } from 'react';

const useSocket = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const Socket = new WebSocket('ws://localhost:8080');
		setSocket(Socket);

		Socket.onclose = () => {
			setSocket(null);
		};
	}, []);

	return socket;
};

export default useSocket;
