import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { MusicProvider } from "@/context/MusicContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MusicProvider>
        <Component {...pageProps} />
      </MusicProvider>
    </ChakraProvider>
  );
}
