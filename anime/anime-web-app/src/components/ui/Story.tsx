import { FC, FormEvent, useEffect, useState } from "react";
import { Stack, Flex, Input, Button } from "@chakra-ui/react";
import { useMusicContext } from "@/context/MusicContext";
import BackgroundMusic from "../BackgroundMusic";
import { StoryProps } from "@/types";



const Story: FC<StoryProps> = ({ video, character }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Prompt: ", prompt);
    setPrompt("");
  };

  const { music } = useMusicContext();

  return (
    <Stack w="full" h="full" maxW={"900"}>
      {music && music.media_uri && <BackgroundMusic src={music.media_uri} />}

      <Flex w="full" h="full" bg="blackAlpha.400" rounded="md">
        Story View
      </Flex>

      {showInput ? (
        <form onSubmit={handleSubmit}>
          <Flex gap={4} alignItems="center">
            <Input
              type="text"
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt"
            />
            <Button type="submit" colorScheme="teal">
              Next
            </Button>
          </Flex>
        </form>
      ) : (
        <Button colorScheme="teal">Next</Button>
      )}
    </Stack>
  );
};

export default Story;
