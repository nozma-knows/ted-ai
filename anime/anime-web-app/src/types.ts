export interface CharacterProps {
  name: string;
  description: string;
}

export interface Character {
  name: string;
  description: string;
  imagery: string;
  personality: string;
}

export interface StoryProps {
  scene: Video;
  character: CharacterProps;
}

export interface Scene {
  name: string;
  imagery: string;
  music: string;
  plot: string;
  characters: Character[];
}

export interface Video {
  title: string;
  videoId?: string;
}

export interface VideoProps {
  video: Video;
  setVideo: (video: Video) => void;
}
