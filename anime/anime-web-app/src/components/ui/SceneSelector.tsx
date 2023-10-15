import { FC } from "react";

import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";

export interface Video {
  title: string;
  videoId?: string;
}

interface VideoProps {
  video: Video;
  setVideo: (video: Video) => void;
}

const videos = [
  {
    title: "Video 1",
    videoId: "652b5c1b43e8c47e4eb4829b"
  },
  {
    title: "Video 2",
  },
  {
    title: "Video 3",
  },
  {
    title: "Video 4",
  },
];



const Video = ({ video, setVideo }: VideoProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const sceneClicked = async (scene: Video) => {
    console.log(scene);
    console.log(backendUrl)
    const response = await fetch(`${backendUrl}/generate_scene/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id: scene.videoId,
      }),
    });

    const data = await response.json();

    console.log(data)

    // Update the scene in the parent component
    setVideo(scene);
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
      onClick={() => sceneClicked(video)}
    >
      <Text>{video.title}</Text>
    </GridItem>
  );
};

interface Props {
  setScene: (scene: Video) => void;
}

const SceneSelector: FC<Props> = ({ setScene }) => {
  return (
    <Flex w="full" justifyContent="center">
      <Grid templateColumns={["repeat(2, 1fr)"]} w="full" maxW={"600"} gap={4}>
        {videos.map((scene) => {
          return <Video key={scene.title} video={scene} setVideo={setScene} />;
        })}
      </Grid>
    </Flex>
  );
};

export default SceneSelector;
