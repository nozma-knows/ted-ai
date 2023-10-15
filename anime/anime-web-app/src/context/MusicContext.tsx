import { useContext, createContext, useState, useEffect } from "react";

interface Music {
  id: string;
  prompt: string;
  state: string;
  createdAt: string;
  media_uri: string;
}

interface Props {
  music: Music | null;
}

const MusicContext = createContext<Props>({
  music: null,
});

export function MusicProvider({ children }: { children?: React.ReactNode }) {
  const [music, setMusic] = useState<Music | null>(null);

  // Function for calling api/leap/generate-music endpoint
  async function generateMusic({
    prompt,
    mode,
    duration,
  }: {
    prompt: string;
    mode: string;
    duration: number;
  }) {
    try {
      const response = await fetch(`../api/leap/generate-music`, {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          mode: mode,
          duration: duration,
        }),
      });
      const data = await response.json();
      setMusic(data);
    } catch (error) {
      console.log("Error generating music: ", error);
    }
  }

  // Function for checking if music has finished generating
  function checkMusicAvailability(id: string) {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `https://api.tryleap.ai/api/v1/music/${id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              authorization: `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        console.log("data: ", data);
        if (data.state === "finished") {
          clearInterval(interval);
          console.log("Music is ready");
          setMusic(data);
        }
      } catch (error) {
        console.log("Error polling for music: ", error);
        clearInterval(interval);
      }
    }, 1000);
  }

  useEffect(() => {
    if (music && music.state !== "finished") {
      console.log("music: ", music);
      checkMusicAvailability(music.id);
    }
  }, [music]);

  if (!music) {
    generateMusic({
      prompt: `Create a soothing and dreamy lofi track that transports the listener to a mystical forest at twilight. The music should evoke a sense of wonder and tranquility, with subtle hints of magic and enchantment woven into the melody. Use gentle, downtempo beats, soft piano chords, and ethereal synth textures to craft a truly enchanting lofi experience.`,
      mode: "melody",
      duration: 20,
    });
  }

  return (
    <MusicContext.Provider
      value={{
        music,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  return useContext<Props>(MusicContext);
}
