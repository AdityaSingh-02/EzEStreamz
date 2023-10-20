'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';


const SocketContext = createContext<any>(null);

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	
	// const socket = useMemo(
	// 	() =>
	// 		io({
	// 			path:"/api/socket_io",
	// 			addTrailingSlash:false,
	// 		}),
	// 	[],
	// );

	

	return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};
