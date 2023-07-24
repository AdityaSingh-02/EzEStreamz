import { createContext } from "react";

export const IUserContext = createContext<{
  user: {
    email: string;
    name: string;
    rid: string;
  };
}>({
  user: { email: "", name: "", rid: "" },
});

export const UserProvider = IUserContext.Provider;