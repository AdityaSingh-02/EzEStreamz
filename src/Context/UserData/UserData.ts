import { createContext, useContext, useState } from "react";
import type { IRoomUsers } from "@/types/IRoomUsers";

interface IUserContext {
  user: IRoomUsers;
  addUser: (user: IRoomUsers) => void;
}

export const IUserContext = createContext(<IUserContext>{
  user: { emailUser1: "", emailUser2: "", rid: "", user1: "" },
  addUser(user) {},
});

export const useUserContext = () => useContext(IUserContext);
