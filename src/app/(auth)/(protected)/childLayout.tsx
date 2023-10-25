'use client';

import React, { useState } from 'react';
import UserProvider, { useAuth } from '@/Context/index';
import { useRouter } from 'next/navigation';
import { VideoProvider, SocketProvider } from '@/Context';
import { PeerProvider } from '@/Context';

export default function ChildLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { authStatus } = useAuth();
	const [videoStatus, setVideoStatus] = useState(false);

	if (!authStatus) {
		router.replace('/');
		return <></>;
	}

	return (
		<>
			<PeerProvider>
				<VideoProvider value={{ videoStatus, setVideoStatus }}>
					<main className='w-[100%]'>
						<SocketProvider>
							<UserProvider>{children}</UserProvider>
						</SocketProvider>
					</main>
				</VideoProvider>
			</PeerProvider>
		</>
	);
}
