import { FC, FormEvent, useState } from "react";
import { Stack, Flex, Input, Button } from "@chakra-ui/react";
import { Scene } from "./SceneSelector";
import { Character } from "./CharacterSelector";

interface Props {
  scene: Scene;
  character: Character;
}

const Story: FC<Props> = () => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Prompt: ", prompt);
    setPrompt("");
  };

  return (
    <Stack w="full" h="full" maxW={"900"}>
      <Flex w="full" h="full" bg="blackAlpha.400" rounded="md">
        Story View
      </Flex>

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
    </Stack>
  );
};

export default Story;
