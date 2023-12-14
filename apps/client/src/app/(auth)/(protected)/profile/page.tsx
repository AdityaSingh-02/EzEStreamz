"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "@/appwrite-service/config";
import { useRouter } from "next/navigation";
import { useVideo } from "@/Context";

interface CreateRoom {
  name: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<CreateRoom>({
    name: "",
    email: "",
  });

  const router = useRouter();
  const { videoStatus } = useVideo();

  // if (videoStatus) {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: false })
  //     .then((res) => {
  //       res.getTracks().forEach((track) => track.stop());
  //     });
  // }

  useEffect(() => {
    async function getUSer() {
      const res = await appwriteService.getUser();
      const { name, email }: any = res;
      setUser({ name, email });
    }
    getUSer();
  }, []);

  const handleCreateRoom = () => {
    router.push("/preview");
  };

  const handleJoinRoom = () => {
    router.push("/join");
  };

  return (
    <>
      <div className="h-screen bg-black flex flex-col justify-center items-center">
        <div className="pb-10">
          <h1 className="text-2xl font-sans">Hey Welcome!! {user.name} 👀</h1>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleCreateRoom}
            className="md:px-4 px-7 md:py-2 py-4 rounded-md bg-gray-500 mx-2"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="md:px-4 px-7 md:py-2 py-4 rounded-md bg-gray-500 mx-2"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
