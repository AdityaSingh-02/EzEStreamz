"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "@/appwrite-service/config";
import { useRouter } from "next/navigation";

interface CreateRoom {
  name: string;
  email: string;
}

const ProfilePage = () => {
  const [createState, changeCreateState] = useState(false);
  const [render, setRender] = useState("");

  const [user, setUser] = useState<CreateRoom>({
    name: "",
    email: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function getUSer() {
      const res = await appwriteService.getUser();
      const { name, email }: CreateRoom = res;
      setUser({ name, email });
    }
    getUSer();
    console.log(user?.name);
  }, [createState]);

  const handleCreateRoom = () => {
    router.push("/preview");
  };

  const handleJoinRoom = () => {
    changeCreateState(true);
    setRender("join");
  };

  return (
    <>
      <div className=" h-screen bg-black flex justify-center items-center">
        {!createState && (
          <div className="flex">
            <button
              onClick={handleCreateRoom}
              className="px-4 py-2 rounded-md bg-gray-500 mx-2">
              Create Room
            </button>
            <button
              onClick={handleJoinRoom}
              className="px-4 py-2 rounded-md bg-gray-500 mx-2">
              Join Room
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
