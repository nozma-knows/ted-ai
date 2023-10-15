import { FC } from "react";

import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

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

const Video = ({ video, setVideo, setScene }: VideoProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const videoClicked = async (video: Video) => {
    console.log(video);
    console.log(backendUrl);
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
      response: {
        name: "Astro Ascend",
        imagery:
          "A breathtaking anime scene where various rockets ascend into the infinite sky, showcasing their magnificent stage separations and their successful triumphant landings back on Earth. The ground is swarmed with enthusiastic crowds, their eyes gleaming with wonder as they witness these historic moments.",
        music:
          "A powerful orchestral score swelling with hope and ambition, punctuated by the thrilling sounds of rocket engines roaring to life, and the crowd's cheers echoing across the launch site.",
        plot: "In a world where space exploration is the pinnacle of human achievement, various organizations compete in launching rockets into the cosmos, each aiming to reach the next frontier. A young and passionate team from a company called 'StarPath' emerges as the underdog in this cutthroat competition. They face numerous challenges, technical intricacies, and intense rivalries. Each launch signifies a step forward in their journey, carving their names in space exploration history. The story progresses with each launch, with suspenseful stage separations, and the nail-biting anticipation of successful landings.",
        characters: [
          {
            name: "Captain Orion",
            description:
              "The leader of the StarPath team, a veteran astronaut with a dream to push humanity's boundaries.",
            imagery:
              "A sturdy figure, with stars sparkling in his eyes and an aura of determination surrounding him.",
            personality:
              "Bold, visionary, and always willing to take risks for the sake of exploration.",
            imageUrl:
              "https://static.tryleap.ai/image-gen-qow4uwdbdiwnlvjmtol4h3o3oy/generated_images/f540261f-7487-4a85-b7ef-3280aca6aa32-0.png",
          },
          {
            name: "Nova",
            description:
              "A young rocket engineer, whose innovative designs are crucial for StarPath's success.",
            imagery:
              "A brilliant woman with a perpetual twinkle of genius in her eyes and blueprint sketches always at hand.",
            personality:
              "Intelligent, curious, and dedicated to her dream of reaching the stars.",
            imageUrl:
              "https://static.tryleap.ai/image-gen-g7ubgylb3r7pikqimuzyj6a2aq/generated_images/37100d2b-c55f-4fed-a911-683404b7b427-0.png",
          },
          {
            name: "Galaxy",
            description:
              "The enthusiastic head of public relations, responsible for rallying support for StarPath's ventures.",
            imagery:
              "An outgoing and charismatic figure, always in the midst of the crowd, sharing the StarPath dream with the world.",
            personality:
              "Charismatic, passionate, with an unyielding belief in the vision of space exploration.",
            imageUrl:
              "https://static.tryleap.ai/image-gen-yopedxtbqrshld4aalagpci5ue/generated_images/66f0ea36-e72a-4e15-adb6-7577252f6816-0.png",
          },
        ],
        prompts: [
          "The scene opens with the vast expanse of an arid desert landscape, bathed in the soft golden hues of the early morning sun. In the midst of nothingness, a towering rocket stands tall, emblazoned with the bold logo of 'StarPath', as scientists and engineers scurry about, making the final preparations for launch.",
        ],
      },
    };

    console.log(data);

    // Update the video in the parent component
    setVideo(video);
    setScene(data.response);
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
            />
          );
        })}
      </MotionGrid>
    </Flex>
  );
};

export default VideoSelector;
