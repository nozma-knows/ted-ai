import { FC, useEffect, useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";
import { CharacterProps } from "@/types";
import { motion } from "framer-motion";
import {
  MotionButton,
  MotionFormControl,
  gridAnimation,
  itemAnimation,
} from "../Motion";

interface Props {
  setCharacter: (character: CharacterProps) => void;
}

const CharacterSelector: FC<Props> = ({ setCharacter }) => {
  const [formData, setFormData] = useState<CharacterProps>({
    name: "",
    description: "",
  });

  function handleSubmit() {
    setCharacter(formData);
  }

  return (
    <Stack>
      <motion.form
        onSubmit={handleSubmit}
        variants={gridAnimation}
        initial="hidden"
        animate="show"
      >
        <MotionFormControl isRequired variants={itemAnimation}>
          <FormLabel htmlFor="name">First Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            placeholder="Enter your first name"
          />
        </MotionFormControl>

        <MotionFormControl mt={4} isRequired variants={itemAnimation}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
            placeholder="Enter a short description of yourself"
          />
        </MotionFormControl>

        <Flex justifyContent={"center"}>
          <MotionButton
            mt={4}
            colorScheme="teal"
            type="submit"
            variants={itemAnimation}
          >
            Submit
          </MotionButton>
        </Flex>
      </motion.form>
    </Stack>
  );
};

export default CharacterSelector;
