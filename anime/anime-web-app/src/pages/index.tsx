import Layout from "@/components/Layout";
import CharacterSelector, {
  CharacterProps,
} from "@/components/ui/CharacterSelector";
import VideoSelector, { Video } from "@/components/ui/VideoSelector";
import Story from "@/components/ui/Story";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scene, setScene] = useState<Video | null>(null);
  const [character, setCharacter] = useState<CharacterProps | null>(null);

  return (
    <Layout>
      <Stack h="full">
        <Heading>Anime Anything</Heading>
        <Flex w="full" h="full" justifyContent="center">
          {/* Display Scene Selector */}
          {!scene && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a scene
              </Text>
              <VideoSelector setVideo={setScene} />
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
          {scene && character && <Story scene={scene} character={character} />}
        </Flex>
      </Stack>
    </Layout>
  );
}
