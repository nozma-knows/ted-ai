import Layout from "@/components/Layout";
import SceneSelector, { Scene } from "@/components/ui/SceneSelector";
import { Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [scene, setScene] = useState<Scene | null>(null);
  // const [character, setCharacter] = useState<Character | null>(null);
  return (
    <Layout>
      <Stack>
        <Heading>Anime Anything</Heading>
        <Flex w="full" justifyContent="center">
          {!scene && (
            <Stack w="full" maxW="600">
              <Text fontWeight="bold" fontSize="2xl">
                Select a scene
              </Text>
              <SceneSelector setScene={setScene} />
            </Stack>
          )}
          {scene && (
            <Flex>
              <Text>{scene.title}</Text>
            </Flex>
          )}
        </Flex>
      </Stack>
    </Layout>
  );
}
