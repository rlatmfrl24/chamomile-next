// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/montserrat";
import "@fontsource/nanum-gothic";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    fonts: {
      heading: `'Montserrat Variable', sans-serif`,
      body: `'Nanum Gothic', sans-serif`,
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
