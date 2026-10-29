"use client";

import type { Hotline } from "@betterbayombong/db";
import { Box, Marquee, Link, Icon } from "@chakra-ui/react";
import { Icon as Iconify } from "@iconify/react";

function HotlineLink({ hotline }: { hotline: Hotline }) {
  return (
    <Link
      href={`tel:${hotline.number}`}
      display="inline-flex"
      alignItems="center"
      gap="1"
      px="2.5"
      py="1"
      rounded="full"
      whiteSpace="nowrap"
      bg="whiteAlpha.200"
      color="white"
      textDecoration="none"
      _hover={{ bg: "whiteAlpha.300" }}
    >
      <Icon>
        <Iconify icon={hotline.icon} />
      </Icon>
      {hotline.office}: {hotline.number}
    </Link>
  );
}

export function HotlinesBar({ hotlines }: { hotlines: Hotline[] }) {
  return (
    <Box bg="red.600" overflow="hidden" py="1" fontSize="sm">
      <Marquee.Root speed={80} spacing="12px" autoFill pauseOnInteraction>
        <Marquee.Viewport>
          <Marquee.Content>
            {hotlines.map(hotline => (
              <Marquee.Item key={hotline.id}>
                <HotlineLink hotline={hotline} />
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Box>
  );
}
