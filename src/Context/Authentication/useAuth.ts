import { useContext } from "react";

import AuthContext from "./authContext";

export const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
}

export default useAuth;