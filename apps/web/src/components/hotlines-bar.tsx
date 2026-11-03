"use client";

import { Box } from "@chakra-ui/react/box";
import { Link } from "@chakra-ui/react/link";
import { Marquee } from "@chakra-ui/react/marquee";
import { Icon } from "@chakra-ui/react/icon";
import { Icon as Iconify } from "@iconify/react";
import type { Hotline } from "@betterbayombong/db";

interface HotlinesBarProps {
  hotlines: Hotline[];
}

interface HotlineLinkProps {
  hotline: Hotline;
}

export function HotlinesBar({ hotlines }: HotlinesBarProps) {
  return (
    <Box
      overflow="hidden"
      py={1}
      bg="red.600"
      fontSize="sm"
    >
      <Marquee.Root
        autoFill
        pauseOnInteraction
        translations={{ root: "Emergency hotlines" }}
        speed={80}
        spacing="12px"
      >
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

function HotlineLink({ hotline }: HotlineLinkProps) {
  return (
    <Link
      href={`tel:${hotline.number}`}
      display="inline-flex"
      alignItems="center"
      gap={1}
      px={2.5}
      py={1}
      rounded="full"
      bg="whiteAlpha.200"
      color="white"
      whiteSpace="nowrap"
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
