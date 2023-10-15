import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { Stack, Flex, Input, Button, Text, Spinner } from "@chakra-ui/react";
import { useMusicContext } from "@/context/MusicContext";
import BackgroundMusic from "../BackgroundMusic";
import { Narration, Panel, Scene, StoryProps } from "@/types";
import Image from "next/image";

interface PanelData {
  imageUrl: string;
  characterName: string;
  text: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Story: FC<StoryProps> = ({ video, character, scene }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [activePanel, setActivePanel] = useState<PanelData | null>(null);
  const [nextPanel, setNextPanel] = useState<PanelData | null>(null);


  const [isPanelLoading, setIsPanelLoading] = useState<boolean>(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Prompt: ", prompt);
    setPrompt("");
  };

  const generateSceneImages = async (scene: Scene) => {
    const imagePromises = scene.prompts.map((prompt) =>
      fetch("/api/leap/generate-scene-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((response) => response.json())
        .then((data) => data.imageUrl)
    );

    const imageUrls = await Promise.all(imagePromises);
    console.log("sceneImages", imageUrls);
    return imageUrls;
  };

  const fetchNextPanel = async (scene: Scene): Promise<PanelData> => {
    setIsPanelLoading(true);
    const response = await fetch(`${backendUrl}/next_panel/`);
    const data = await response.json();
    const panel: Panel = data.response;

    // Find the character in the scene with the same name as the panel's character
    const character = scene.characters.find((c) => c.name === panel.character);

    // If the character is found, return the panel data
    if (character) {
      if (!character.imageUrl) {
        throw new Error("Character image is not defined");
      }
      setIsPanelLoading(false);
      return {
        imageUrl: character.imageUrl,
        characterName: character.name,
        text: panel.text,
      };
    }

    // If the character is not found, call mapCharacterIntoScene
    const mapCharacterResponse = await fetch("/api/mapCharacterIntoScene", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character: panel.character, scene }),
    });
    const mapCharacterData = await mapCharacterResponse.json();
    const characterName = mapCharacterData.name;

    const newChar = scene.characters.find((c) => c.name === panel.character);
    setIsPanelLoading(false);
    if (!newChar?.imageUrl) {
      // pick a random character if all else fails
      const randomCharacter =
        scene.characters[Math.floor(Math.random() * scene.characters.length)];
      return {
        imageUrl: randomCharacter.imageUrl!,
        characterName: randomCharacter.name,
        text: panel.text,
      };
    }

    return {
      imageUrl: newChar?.imageUrl!, // You might want to generate an image for this character
      characterName: characterName,
      text: panel.text,
    };
  };


  const fetchInitialNarration = useCallback(async (scene: Scene): Promise<PanelData> => {
    const response = await fetch(`${backendUrl}/first_narration/`);
    const data = await response.json();
    const narration: Narration = data.response;

    // Generate a new scene image
    const newSceneImageUrls = await generateSceneImages(scene);

    // If the narration's name is "Narrator", return the narration data
    if (!scene.imageUrls) {
      throw new Error("Scene image is not defined");
    }
    return {
      imageUrl: newSceneImageUrls[0],
      characterName: "Narrator",
      text: narration.text,
    };
  }, []);



  const handleNext = useCallback(async () => {
    // If it's the start of the scene, fetch the initial narration
    if (messageCount === 0) {
      const initialNarration = await fetchInitialNarration(scene);
      setActivePanel(initialNarration);
      const nextPanelData = await fetchNextPanel(scene);
      setNextPanel(nextPanelData);
    } else if (messageCount % 5 === 0 && messageCount !== 0) {
      // If it's time for a narration, display the next narration
      if (!nextPanel) {
      // Pre-fetch the next panel
      const nextPanelData = await fetchNextPanel(scene);
      setNextPanel(nextPanelData);
      }
    } else {
      // If it's time for a panel, display the next panel
      if (nextPanel) {
        setActivePanel(nextPanel);
        const nextPanelData = await fetchNextPanel(scene);
        setNextPanel(nextPanelData);
      } else {
        const nextPanelData = await fetchNextPanel(scene);
        setActivePanel(nextPanelData);
        const nextPanelData2 = await fetchNextPanel(scene);
        setNextPanel(nextPanelData2);
      }

    }
  
    setMessageCount((count) => count + 1);
  }, [fetchInitialNarration, messageCount, nextPanel, scene]);

  useEffect(() => {
    if (messageCount === 0) {
      handleNext();
    }
  }, [messageCount, handleNext]);
  
  const { music } = useMusicContext();

  return (
    <Stack w="full" h="full" maxW={"600"}>
      {music && music.media_uri && <BackgroundMusic src={music.media_uri} />}

      <Flex w="full" h="full" rounded="md">
        {activePanel ? (
          <Flex w="full" position="relative" aspectRatio={1 / 1}>
            <Image
              src={activePanel.imageUrl}
              alt="Active"
              fill
              className="rounded-md aspect-square"
              priority
            />
            <Flex w="full">
              <Flex
                w="full"
                position="absolute"
                left="0"
                bottom={2}
                textColor="white"
                rounded="md"
                p={4}
              >
                <Stack bg="blackAlpha.800" textColor="white" p="4" rounded="md">
                  <Text fontWeight="bold" fontSize="xl">
                    {activePanel.characterName}
                  </Text>
                  <Text fontSize="lg">{activePanel.text}</Text>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex
            w="full"
            aspectRatio={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner />
          </Flex>
        )}
      </Flex>


        <Button onClick={handleNext}  colorScheme="teal" isDisabled={isPanelLoading}>
          Next
        </Button>
    </Stack>
  );
};

export default Story;
