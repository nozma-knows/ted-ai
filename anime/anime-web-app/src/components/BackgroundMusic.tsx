import React, { useEffect, useRef } from "react";

interface BackgroundMusicProps {
  src: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ src }) => {
  console.log("in backgroundMusic");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start the music when the component mounts
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error("Playback failed:", error);
        // Handle the error, e.g., show a play button to the user
      });
    }

    // Return a cleanup function to stop the music when the component unmounts
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
