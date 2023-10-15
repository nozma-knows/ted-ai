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
  const [generatedCharacter, setGeneratedCharacter] = useState<Character | null>(null); // [1
  const [scene, setScene] = useState<Scene | null>(null);
  const [generatingScene, setGeneratingScene] = useState<Scene | null>(null);
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
    // Function to generate image for a scene
const generateSceneImages = async (scene: Scene) => {
  const charString = JSON.stringify(scene.characters);
  const imagePromises = scene.prompts.map(prompt =>
    fetch('/api/leap/generate-scene-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt  }),
    }).then(response => response.json()).then(data => data.imageUrl)
  );

  const imageUrls = await Promise.all(imagePromises);
  console.log("sceneImages", imageUrls);
  return imageUrls;
};
  
    // Check if scene is not null
    if (scene) {
    // Create a copy of the scene
    const updatedScene = { ...scene };

    // Generate image for each character without an imageUrl
    const characterImagePromises = updatedScene.characters.map(character => {
      if (!character.imageUrl) {
        return generateCharacterImage(character).then(imageUrl => {
          character.imageUrl = imageUrl;
          return character;
        });
      }
      return Promise.resolve(character);
    });

    // Generate image for the scene if it doesn't have an imageUrl
    const sceneImagePromise = updatedScene.imageUrls && updatedScene.imageUrls.length > 0 ? Promise.resolve(updatedScene.imageUrls) : generateSceneImages(updatedScene);

    Promise.all([...characterImagePromises, sceneImagePromise])
      .then(results => {
        const characters = results.slice(0, -1).flat() as Character[];
        const sceneImageUrls = results[results.length - 1];

        updatedScene.characters = characters;
        updatedScene.imageUrls = sceneImageUrls as string[]; // Update imageUrls instead of imageUrl

        // Only update the finalScene state if it has changed
        if (JSON.stringify(generatingScene) !== JSON.stringify(updatedScene)) {
          setGeneratingScene(updatedScene);
        }
      });
  }
  }, [scene]); // Depend on scene state


  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const generateCharacter = async () => {
      if (!character) {
        return;
      }
  
      const response = await fetch(`${backendUrl}/generate_user_character/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: character.name,
          description: character.description,
        }),
      });
  
      const data = await response.json();
  
      // Assuming the generated character is returned in the `data.response` field
      const generatedCharacter = data.response;
  
      // Generate image for the character
      const imageResponse = await fetch('/api/leap/generate-character-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: generatedCharacter, // Assuming the character's name is used as the prompt
        }),
      });
  
      const imageData = await imageResponse.json();


  
      // Assuming the image URL is returned in the `imageData.imageUrl` field
      generatedCharacter.imageUrl = imageData.imageUrl;

      console.log("generatedCharacter", generatedCharacter);
  
      setGeneratedCharacter(generatedCharacter);
    };
  
    generateCharacter();
  }, [character]); // Depend on character state

  useEffect(() => {
    if (finalScene) {
      console.log("Final Scene: ", finalScene);
    }
  }, [finalScene]); // Depend on finalScene state


  useEffect(() => {
    if (generatedCharacter && generatingScene) {
      const finalCharacters = [...generatingScene.characters, generatedCharacter];
      setFinalScene({
        ...generatingScene,
        characters: finalCharacters,
      });
    }
  }, [generatedCharacter, generatingScene]); // Depend on generatedCharacter and generatedScene states

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
          {video && character && finalScene && <Story video={video} character={character} scene={finalScene} />}
        </Flex>
      </Stack>
    </Layout>
  );
}
