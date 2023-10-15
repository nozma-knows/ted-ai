import { FC } from "react";

import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";

export interface Scene {
  title: string;
}

interface SceneProps {
  scene: Scene;
  setScene: (scene: Scene) => void;
}

const scenes = [
  {
    title: "Scene 1",
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
  return (
    <GridItem
      as={motion.div}
      bg="blackAlpha.400"
      aspectRatio={1 / 1}
      rounded="md"
      // border="2px solid transparent"
      // _hover={{
      //   border: "2px solid black",
      // }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      cursor="pointer"
      onClick={() => setScene(scene)}
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
