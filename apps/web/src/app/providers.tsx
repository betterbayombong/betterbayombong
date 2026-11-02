"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
