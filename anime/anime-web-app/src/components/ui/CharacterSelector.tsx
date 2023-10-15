import { FC, useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { CharacterProps } from "@/types";


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
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
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
        </FormControl>

        <FormControl mt={4} isRequired>
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
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default CharacterSelector;
