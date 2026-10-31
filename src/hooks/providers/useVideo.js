import { useRef, useState } from "react";

const useVideo = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleToggle = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  };

  const handleOpen = async () => {
    setIsVideoOpen(true);
  };

  const handleClose = () => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setIsPlaying(false);
    setIsVideoOpen(false);
  };

  return {
    videoRef,
    isPlaying,
    setIsPlaying,
    isVideoOpen,
    handleToggle,
    handleOpen,
    handleClose,
  };
};

export default useVideo;
