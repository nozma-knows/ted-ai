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
    title: "SpaceX Launch",
    videoId: "652b5c1b43e8c47e4eb4829b",
    imageUrl: "https://github.com/nozma-knows/ted-ai/assets/42284494/4773dc05-c497-419d-864c-d1a5f081e5f0"
  },
  {
    title: "Steve Irwin feeding his Crocs",
    videoId: "652c1dfd43e8c47e4eb483ec",
    imageUrl: "https://github.com/nozma-knows/ted-ai/assets/42284494/ae17b93a-15f2-4564-b668-08e0e0b98df7"
  },
  {
    title: "1984 Apple Macintosh Commercial",
    videoId: "652c1e2c43e8c47e4eb483ed",
    imageUrl: "https://github.com/nozma-knows/ted-ai/assets/42284494/688cea24-6aaf-40c2-bf8c-1e82ccdd606a"
  },
  {
    title: "Anakin vs Obiwan",
    imageUrl: "https://github.com/nozma-knows/ted-ai/assets/42284494/9737bcd0-1023-429b-ab2e-f2df41e6e9e7",
    videoId: "652c1e3f43e8c47e4eb483ee"
    
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
      // bg="blackAlpha.400"
      aspectRatio={1 / 1}
      rounded="md"
      width={'md'}
      variants={itemAnimation}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      cursor="pointer"
      onClick={() => videoClicked(video)}
    >
      <Text>{video.title}</Text>
      <img width={'500px'} src={video.imageUrl}></img>
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
