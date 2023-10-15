import { FC } from "react";

import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

export interface Character {
  name: string;
}

interface CharacterProps {
  character: Character;
  setCharacter: (character: Character) => void;
}

const characters = [
  {
    name: "Character 1",
  },
  {
    name: "Character 2",
  },
  {
    name: "Character 3",
  },
  {
    name: "Character 4",
  },
];

const Character = ({ character, setCharacter }: CharacterProps) => {
  return (
    <GridItem
      bg="blackAlpha.400"
      aspectRatio={1 / 1}
      rounded="md"
      border="2px solid transparent"
      _hover={{
        border: "2px solid black",
      }}
      cursor="pointer"
      onClick={() => setCharacter(character)}
    >
      <Text>{character.name}</Text>
    </GridItem>
  );
};

interface Props {
  setCharacter: (character: Character) => void;
}

const CharacterSelector: FC<Props> = ({ setCharacter }) => {
  return (
    <Flex w="full" justifyContent="center">
      <Grid templateColumns={["repeat(2, 1fr)"]} w="full" maxW={"600"} gap={4}>
        {characters.map((character) => {
          return (
            <Character
              key={character.name}
              character={character}
              setCharacter={setCharacter}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export default CharacterSelector;
