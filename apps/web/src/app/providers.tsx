"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Providers({ children }: React.PropsWithChildren) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
