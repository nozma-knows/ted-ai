import { FC, PropsWithChildren } from "react";

import { Box, Flex, Stack } from "@chakra-ui/react";

interface Props extends PropsWithChildren {}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <Box
      h="100vh"
      w="100%"
      alignItems={"center"}
      overflow={"hidden"}
      bgGradient="radial(circle 400px at top, RGBA(96,98,159,0.2), RGBA(255,255,255,0))"
    >
      <Stack h="full" maxH="full" gap={0} position="relative">
        <Flex
          flexDir={"column"}
          maxW={"100%"}
          marginX="auto"
          p={4}
          w="100%"
          h="full"
        >
          {children}
        </Flex>
      </Stack>
    </Box>
  );
};

export default Layout;
