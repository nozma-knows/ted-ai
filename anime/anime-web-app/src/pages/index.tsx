import Layout from "@/components/Layout";

import VideoSelector from "@/components/ui/VideoSelector";
import Story from "@/components/ui/Story";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Character, CharacterProps, Scene, Video } from "@/types";
import CharacterSelector from "@/components/ui/CharacterSelector";

export default function Home() {
  const [video, setVideo] = useState<Video | null>(null);
  const [character, setCharacter] = useState<CharacterProps | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [finalScene, setFinalScene] = useState<Scene | null>(null);

  useEffect(() => {
    // Function to generate image for a character
    const generateCharacterImage = async (character: Character) => {
      const response = await fetch('/api/leap/generate-character-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character, // Assuming the character's name is used as the prompt
        }),
      });
  
      const data = await response.json();
      console.log("characterImage", data);

      return data.imageUrl;
    };
  
    // Function to generate image for a scene
    const generateSceneImage = async (scene: Scene) => {
      const charString = JSON.stringify(scene.characters);
      const response = await fetch('/api/leap/generate-scene-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({scene: {
          ...scene, characters: charString
        }}),
      });
  
      const data = await response.json();
      console.log("sceneImage", data);
      return data.imageUrl;
    };
  
    // Check if scene is not null
    if (scene) {
      // Create a copy of the scene
      const updatedScene = { ...scene };
  
      // Generate image for each character without an imageUrl
      const characterImagePromises = updatedScene.characters.map(async character => {
        if (!character.imageUrl) {
          character.imageUrl = await generateCharacterImage(character);
        }
        return character;
      });
  
      // Generate image for the scene if it doesn't have an imageUrl
      const sceneImagePromise = updatedScene.imageUrl ? Promise.resolve(updatedScene.imageUrl) : generateSceneImage(updatedScene);
  
      Promise.all([...characterImagePromises, sceneImagePromise])
        .then(results => {
          const characters = results.slice(0, -1);
          const sceneImageUrl = results[results.length - 1];
  
          updatedScene.characters = characters;
          updatedScene.imageUrl = sceneImageUrl;
  
          // Only update the finalScene state if it has changed
          if (JSON.stringify(finalScene) !== JSON.stringify(updatedScene)) {
            setFinalScene(updatedScene);
          }
        });
    }
  }, [scene]); // Depend on scene state

  useEffect(() => {
    console.log(finalScene)
  }, [finalScene])

  return (
    <Layout>
      <Stack h="full">
        <Heading>Anime Anything</Heading>
        <Flex w="full" h="full" justifyContent="center">
          {/* Display Scene Selector */}
          {!video && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a scene
              </Text>
              <VideoSelector setVideo={setVideo} setScene={setScene}/>
            </Stack>
          )}
          {/* Display Character Selector */}
          {video && !character && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a character
              </Text>
              <CharacterSelector setCharacter={setCharacter} />
            </Stack>
          )}
          {/* Diplay Story */}
          {video && character && <Story video={video} character={character} scene={finalScene} />}
        </Flex>
      </Stack>
    </Layout>
  );
}
