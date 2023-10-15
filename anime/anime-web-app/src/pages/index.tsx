import Layout from "@/components/Layout";

import VideoSelector from "@/components/ui/VideoSelector";
import Story from "@/components/ui/Story";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CharacterProps, Video } from "@/types";
import CharacterSelector from "@/components/ui/CharacterSelector";

export default function Home() {
  const [video, setVideo] = useState<Video | null>(null);
  const [character, setCharacter] = useState<CharacterProps | null>(null);
  const [story, setStory] = useState<string | null>(null);


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
              <VideoSelector setVideo={setVideo} />
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
          {video && character && <Story video={video} character={character} />}
        </Flex>
      </Stack>
    </Layout>
  );
}
