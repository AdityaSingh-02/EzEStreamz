import React, { ReactNode, useState } from "react";
import type { IRoomUsers } from "@/types/IRoomUsers";
import { IUserContext } from "./UserData";

interface IProps {
  children: ReactNode;
}

const UserProvider = ({ children }: IProps) => {
  const [user, addUser] = useState<IRoomUsers>({
    user1: "",
    user2: "",
    emailUser1: "",
    emailUser2: "",
    rid: "",
  });

  const userData = (data: IRoomUsers) => {
    addUser(data);
  };

  return (
    <IUserContext.Provider value={{ user, addUser }}>
      {children}
    </IUserContext.Provider>
  );
};

export default UserProvider;
