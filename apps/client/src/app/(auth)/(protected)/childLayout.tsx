'use client';

import React, { useState } from 'react';
import UserProvider, { useAuth } from '@/Context/index';
import { useRouter } from 'next/navigation';
import { VideoProvider } from '@/Context';

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
				<VideoProvider value={{ videoStatus, setVideoStatus }}>
					<main className='w-[100%]'>
							<UserProvider>{children}</UserProvider>
					</main>
				</VideoProvider>
		</>
	);
}
