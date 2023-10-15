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
    // const response = await fetch(`${backendUrl}/generate_scene/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     video_id: video.videoId,
    //   }),
    // });

    // const data = await response.json();
    const data = {
      "response": {
          "name": "Rockets' Ascend",
          "imagery": "The scene unfolds at a vast rocket launch site, with a crowd gathered in anticipation. The sky is clear, with the sun glistening in the backdrop, creating a dramatic contrast with the towering rockets ready for lift-off. Television screens and livestreams across the globe echo the excitement and tension.",
          "music": "The music is an orchestra of anticipation and adventure, mixing the sounds of escalating violins and drums with the occasional crescendos of horns to highlight the rockets' ascend.",
          "plot": "In a futuristic world, where space exploration has become a spectator sport, different factions compete in launching rockets, the most prominent being SpaceX with their Starship and Falcon 9. Each launch is a high-stakes game, with not just the teams but the whole world watching. The story revolves around these launches, the rivalries, the triumphs and the failures, and the dreams of reaching the stars.",
          "characters": [
              {
                  "name": "Captain Blast",
                  "description": "A veteran astronaut and the charismatic leader of the SpaceX team.",
                  "imagery": "Donning a sleek silver flight suit with the SpaceX logo, he embodies ambition and courage.",
                  "personality": "Determined, charismatic, and always eager to push the boundaries of space exploration."
              },
              {
                  "name": "Nova",
                  "description": "A young genius engineer responsible for designing the rockets.",
                  "imagery": "With her blueprint-covered overalls and ever-present clipboard, she's the brain behind the rockets.",
                  "personality": "Intelligent, meticulous, and passionate about her creations reaching the stars."
              }
          ]
      }
  }

    console.log(data)

    // Update the video in the parent component
    setVideo(video);
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
