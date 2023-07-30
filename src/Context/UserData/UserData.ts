import { createContext } from "react";

export const IUserContext = createContext<{
  intialData: {email: string, name: string, rid?: string};
  userData : (email: string, name: string, rid?: string) => void;
}>({
  intialData: {email:'', name: '', rid:''},
  userData:() => {},
});

export const UserProvider = IUserContext.Provider;