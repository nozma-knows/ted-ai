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
  scene: Scene;
}

export interface Scene {
  name: string;
  imagery: string;
  music: string;
  plot: string;
  characters: Character[];
  imageUrls?: string[];
  prompts: string[]; // Add this line
}

export interface Video {
  title: string;
  videoId?: string;
}

export interface VideoProps {
  video: Video;
  setVideo: (video: Video) => void;
  setScene: (scene: Scene) => void;
  setLoading: (loading: boolean) => void;
}

export interface Panel {
  character: string;
  text: string;
}

export interface Narration {
  name: string;
  text: string;
}
