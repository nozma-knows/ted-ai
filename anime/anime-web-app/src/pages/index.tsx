import Layout from "@/components/Layout";
import CharacterSelector, {
  Character,
} from "@/components/ui/CharacterSelector";
import SceneSelector, { Scene } from "@/components/ui/SceneSelector";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    console.log("Character: ", character);
  }, [character]);
  return (
    <Layout>
      <Stack>
        <Heading>Anime Anything</Heading>
        <Flex w="full" justifyContent="center">
          {/* Display Scene Selector */}
          {!scene && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a scene
              </Text>
              <SceneSelector setScene={setScene} />
            </Stack>
          )}
          {/* Display Character Selector */}
          {scene && !character && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a character
              </Text>
              <CharacterSelector setCharacter={setCharacter} />
            </Stack>
          )}
          {/* Diplay Story */}
          {scene && character && (
            <Stack>
              <Text>{`Selected schene: ${scene.title}`}</Text>
              <Text>{`Selected character: ${character.name}`}</Text>
            </Stack>
          )}
        </Flex>
      </Stack>
    </Layout>
  );
}
