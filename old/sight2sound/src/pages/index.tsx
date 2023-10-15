import Layout from "@/components/layout/Layout";
import { Button, Flex, Stack, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  async function handleTranscribe() {
    try {
      const res = await fetch(`../api/twelve-labs/summarize`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <Stack maxW="900">
        <Heading>Sight 2 Sound</Heading>
        <Flex gap={"4"}>
          <Input
            type="text"
            name="videoUrl"
            placeholder="Enter the URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleTranscribe}>Transcribe</Button>
        </Flex>
      </Stack>
    </Layout>
  );
}
