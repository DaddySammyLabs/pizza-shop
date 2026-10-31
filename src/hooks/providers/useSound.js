import { useEffect, useRef, useState } from "react";

const useSound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundSrc = "/sounds/LionelRichie-HowLong.mp3";

  const createAudio = () => {
    if (!audioRef.current) {
      // audioRef.current = new Audio("/sounds/pornhub-intro-sound.mp3");
      audioRef.current = new Audio(soundSrc);

      audioRef.current.addEventListener("play", () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    return audioRef.current;
  };

  const playSong = () => {
    const audio = createAudio();
    audio.play();
  };

  const togglePlaySong = () => {
    const audio = createAudio();

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  // useEffect(() => {
  //   playSong();
  // }, []);

  return {
    playSong,
    togglePlaySong,
    isPlaying,
  };
};

export default useSound;
