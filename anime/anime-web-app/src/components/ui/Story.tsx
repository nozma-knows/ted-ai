import { FC, FormEvent, useEffect, useState } from "react";
import { Stack, Flex, Input, Button } from "@chakra-ui/react";
import { useMusicContext } from "@/context/MusicContext";
import BackgroundMusic from "../BackgroundMusic";
import { Narration, Panel, Scene, StoryProps } from "@/types";

interface PanelData {
  imageUrl: string;
  characterName: string;
  text: string;
}

const Story: FC<StoryProps> = ({ video, character, scene }:) => {
  const [prompt, setPrompt] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [activePanel, setActivePanel] = useState<PanelData | null>(null);
  const [nextPanel, setNextPanel] = useState<PanelData | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Prompt: ", prompt);
    setPrompt("");
  };

  const fetchNextPanel = async (scene: Scene): Promise<Panel> => {
    const response = await fetch('/api/next_panel/');
    const data = await response.json();
    const panel: Panel = data.response;
  
    // Find the character in the scene with the same name as the panel's character
    const character = scene.characters.find(c => c.name === panel.character);
  
    // If the character is found, set the active image to the character's image
    if (character) {
      if (!character.imageUrl) {
        throw new Error("Character image is not defined");
      }
      setActivePanel(character.imageUrl);
    }
  
    return panel;
  };
  
  const fetchNextNarration = async (scene: Scene): Promise<Narration> => {
    const response = await fetch('/api/next_narration/');
    const data = await response.json();
    const narration: Narration = data.response;
  
    // If the narration's name is "Narrator", set the active image to the scene's image
    if (narration.name === "Narrator") {
      if (!scene.imageUrl) {
        throw new Error("Scene image is not defined");
      }
      setActivePanel({
        characterName: narration.name,
        imageUrl: scene.imageUrl,
        text: narration.text,
      });
    }
  
    return narration;
  };

  // Define a type for the image data



// Fetch initial narration and image when component mounts
useEffect(() => {
  fetchNextNarration(scene).then(narration => {
    setActivePanel({
      imageUrl: scene.imageUrl,
      characterName: narration.name,
      text: narration.text,
    });
    fetchNextPanel(scene).then(panel => {
      const character = scene.characters.find(c => c.name === panel.character);
      if (character) {
        setNextPanel({
          imageUrl: character.imageUrl,
          characterName: panel.character,
          text: panel.text,
        });
      }
    });
  });
}, []); // Depend on whatever state variables you need

// Handle the next button click
const handleNext = () => {
  if (nextPanel) {
    setActivePanel(nextPanel);
    fetchNextPanel(scene).then(panel => {
      const character = scene.characters.find(c => c.name === panel.character);
      if (character) {
        setNextPanel({
          imageUrl: character.imageUrl,
          characterName: panel.character,
          text: panel.text,
        });
      }
    });
  }
};

// In your JSX
<Button onClick={handleNext} colorScheme="teal">Next</Button>



  const { music } = useMusicContext();

  return (
    <Stack w="full" h="full" maxW={"900"}>
      {music && music.media_uri && <BackgroundMusic src={music.media_uri} />}

      <Flex w="full" h="full" bg="blackAlpha.400" rounded="md">
        Story View
        <img src={activePanel} alt="Active" />
      </Flex>

      {showInput ? (
        <form onSubmit={handleSubmit}>
          <Flex gap={4} alignItems="center">
            <Input
              type="text"
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt"
            />
            <Button type="submit" colorScheme="teal">
              Next
            </Button>
          </Flex>
        </form>
      ) : (
        <Button colorScheme="teal">Next</Button>
      )}
    </Stack>
  );
};

export default Story;
