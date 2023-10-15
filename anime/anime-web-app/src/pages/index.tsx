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

  // Inside your component
  useEffect(() => {
    // Function to generate image for a character
    const generateImage = async (character: Character) => {
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
  
      console.log(data);
      // Assuming the image URL is returned in the `data.imageUrl` field
      return data.imageUrl;
    };

    // Check if scene is not null and if any character doesn't have an imageUrl
    if (scene && scene.characters.some(character => !character.imageUrl)) {
      // Create a copy of the scene
      const updatedScene = { ...scene };

      // Generate image for each character without an imageUrl
      Promise.all(
        updatedScene.characters.map(async character => {
          if (!character.imageUrl) {
            character.imageUrl = await generateImage(character);
          }
          return character;
        })
      ).then(characters => {
        updatedScene.characters = characters;
        // Update the scene state
        setScene(updatedScene);
      });

      // Update the scene state
      setScene(updatedScene);
    }
  }, [scene]); // Depend on scene state

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
          {video && character && <Story video={video} character={character} scene={scene} />}
        </Flex>
      </Stack>
    </Layout>
  );
}
