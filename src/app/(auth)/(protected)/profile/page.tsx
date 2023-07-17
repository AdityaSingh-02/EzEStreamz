"use client";
import React, { useState } from "react";

const ProfilePage = () => {
  const [createState, changeCreateState] = useState(false);
  const [render, setRender] = useState("");

  const handleCreateRoom = () => {
    changeCreateState(true);
    setRender("create");
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
        {createState && (render === "create" ? (
          <div className="flex flex-col items-center justify-center px-16 py-7 bg-teal-800 rounded-lg">
            <p className="text-2xl pb-6">Create Room</p>
            <div className="flex flex-col space-y-5 text-black">
              <input className="px-4 py-2 rounded-lg" type="text" name="" id="" />
              <input className="px-4 py-2 rounded-lg" type="text" name="" id="" />
              <button className="px-4 py-2 rounded-lg bg-slate-800" >Create</button>
            </div>
          </div>
        ) : (
          <div>Join</div>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
