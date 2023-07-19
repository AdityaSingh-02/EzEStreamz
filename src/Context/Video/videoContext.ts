import { createContext } from "react";


export const VideoContext = createContext<{
    videoStatus: boolean;
    setVideoStatus: (status: boolean) => void;
}>({
    videoStatus: true,
    setVideoStatus: () => {},
})

export const VideoProvider = VideoContext.Provider

export default VideoContext;