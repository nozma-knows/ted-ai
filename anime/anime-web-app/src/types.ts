export interface CharacterProps {
  name: string;
  description: string;
}

export interface Character {
  name: string;
  description: string;
  imagery: string;
  personality: string;
  imageUrl?: string;
}
export interface StoryProps {
  video: Video;
  character: CharacterProps;
  scene: Scene | null;
}

export interface Scene {
  name: string;
  imagery: string;
  music: string;
  plot: string;
  characters: Character[];
  imageUrl?: string;
}

export interface Video {
  title: string;
  videoId?: string;
}

export interface VideoProps {
  video: Video;
  setVideo: (video: Video) => void;
  setScene  : (scene: Scene) => void;
}
