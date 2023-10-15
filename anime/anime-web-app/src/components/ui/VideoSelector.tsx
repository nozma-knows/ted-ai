import { FC, useState } from "react";

import { Flex, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { VideoProps, Video, Scene } from "@/types";
import {
  MotionGrid,
  MotionGridItem,
  gridAnimation,
  itemAnimation,
} from "../Motion";

const videos = [
  {
    title: "Video 1",
    videoId: "652b5c1b43e8c47e4eb4829b",
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

const Video = ({ video, setVideo, setScene, setLoading }: VideoProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const videoClicked = async (video: Video) => {
    setLoading(true);
    console.log(video);
    console.log(backendUrl);
    const response = await fetch(`${backendUrl}/generate_scene/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id: video.videoId,
      }),
    });

    const data = await response.json();


    console.log(data);

    // Update the video in the parent component
    setVideo(video);
    setScene(data.response);
    setLoading(false);
  };

  return (
    <MotionGridItem
      bg="blackAlpha.400"
      aspectRatio={1 / 1}
      rounded="md"
      variants={itemAnimation}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      cursor="pointer"
      onClick={() => videoClicked(video)}
    >
      <Text>{video.title}</Text>
    </MotionGridItem>
  );
};

interface Props {
  setVideo: (video: Video) => void;
  setScene: (scene: Scene) => void;
}

const VideoSelector: FC<Props> = ({ setVideo, setScene }) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <Flex
        w="full"
        aspectRatio={16 / 9}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner />
      </Flex>
    );
  }
  return (
    <Flex w="full" justifyContent="center">
      <MotionGrid
        templateColumns={["repeat(2, 1fr)"]}
        w="full"
        maxW={"600"}
        gap={4}
        variants={gridAnimation}
        initial="hidden"
        animate="show"
      >
        {videos.map((video) => {
          return (
            <Video
              key={video.title}
              video={video}
              setVideo={setVideo}
              setScene={setScene}
              setLoading={setLoading}
            />
          );
        })}
      </MotionGrid>
    </Flex>
  );
};

export default VideoSelector;
