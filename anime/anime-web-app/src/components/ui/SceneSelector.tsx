import { FC } from "react";

import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";

export interface Scene {
  title: string;
  videoId?: string;
}

interface SceneProps {
  scene: Scene;
  setScene: (scene: Scene) => void;
}

const scenes = [
  {
    title: "Scene 1",
    videoId: "652b5c1b43e8c47e4eb4829b"
  },
  {
    title: "Scene 2",
  },
  {
    title: "Scene 3",
  },
  {
    title: "Scene 4",
  },
];



const Scene = ({ scene, setScene }: SceneProps) => {
  const sceneClicked = async (scene: Scene) => {
    const response = await fetch('http://localhost:8000/generate_scene/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id: scene.videoId,
      }),
    });

    const data = await response.json();

    // Update the scene in the parent component
    setScene(data.response);
  }


  return (
    <GridItem
      as={motion.div}
      bg="blackAlpha.400"
      aspectRatio={1 / 1}
      rounded="md"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      cursor="pointer"
      onClick={() => sceneClicked(scene)}
    >
      <Text>{scene.title}</Text>
    </GridItem>
  );
};

interface Props {
  setScene: (scene: Scene) => void;
}

const SceneSelector: FC<Props> = ({ setScene }) => {
  return (
    <Flex w="full" justifyContent="center">
      <Grid templateColumns={["repeat(2, 1fr)"]} w="full" maxW={"600"} gap={4}>
        {scenes.map((scene) => {
          return <Scene key={scene.title} scene={scene} setScene={setScene} />;
        })}
      </Grid>
    </Flex>
  );
};

export default SceneSelector;
