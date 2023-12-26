export { useAuth } from './Authentication/useAuth';

// Video Context Export
export { useVideo } from './Video/useVideo';
export { VideoProvider, VideoContext } from './Video/videoContext';

// User Context Export
import UserProvider from './UserData/UserProvider';
export { IUserContext, useUserContext } from './UserData/UserData';
export default UserProvider;

// SocketIO connection
export { SocketProvider, useSocket } from './Socket/socket-provider';

export { usePeer, PeerProvider } from './usePeer';
