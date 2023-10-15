import { FC } from "react";

import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { VideoProps, Video, Scene } from "@/types";


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



const Video = ({ video, setVideo, setScene }: VideoProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const videoClicked = async (video: Video) => {
    console.log(video);
    console.log(backendUrl)
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

    console.log(data)

    // Update the video in the parent component
    setVideo(video);
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
      onClick={() => videoClicked(video)}
    >
      <Text>{video.title}</Text>
    </GridItem>
  );
};

interface Props {
  setVideo: (video: Video) => void;
  setScene: (scene: Scene) => void;
}

const VideoSelector: FC<Props> = ({ setVideo, setScene }) => {
  return (
    <Flex w="full" justifyContent="center">
      <Grid templateColumns={["repeat(2, 1fr)"]} w="full" maxW={"600"} gap={4}>
        {videos.map((video) => {
          return <Video key={video.title} video={video} setVideo={setVideo} setScene={setScene}/>;
        })}
      </Grid>
    </Flex>
  );
};

export default VideoSelector;
