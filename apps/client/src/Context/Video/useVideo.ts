import { useContext } from "react";
import VideoContext from "./videoContext";

export const useVideo = () => {
  const data = useContext(VideoContext);
  return data;
};
