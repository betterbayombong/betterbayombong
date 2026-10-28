"use client";

import { Box, Marquee, Link, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  PiShieldFill,
  PiHeartFill,
  PiHospitalFill,
  PiBuildingOfficeFill,
  PiSirenFill,
  PiHeartbeatFill,
} from "react-icons/pi";

// TODO (h4ckedneko): Save to database.
interface Hotline {
  id: string;
  label: string;
  number: string;
  tel: string;
  icon: IconType;
}

// Placeholder entries — numbers are fake until real Bayombong hotlines are added.
const HOTLINES: Hotline[] = [
  {
    id: "mdrrmo",
    label: "MDRRMO",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiShieldFill,
  },
  {
    id: "mswd",
    label: "MSWD",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiHeartFill,
  },
  {
    id: "hospital",
    label: "Hospital",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiHospitalFill,
  },
  {
    id: "mayor",
    label: "Mayor",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiBuildingOfficeFill,
  },
  {
    id: "mpso",
    label: "MPSO",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiSirenFill,
  },
  {
    id: "health",
    label: "Health",
    number: "(02) 0000-0000",
    tel: "0200000000",
    icon: PiHeartbeatFill,
  },
];

export function HotlineBar() {
  return (
    <Box bg="red.600" overflow="hidden" py="1" fontSize="sm">
      <Marquee.Root
        speed={50}
        autoFill
        pauseOnInteraction
        spacing="12px"
        translations={{ root: "Emergency hotlines" }}
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {HOTLINES.map((hotline) => (
              <Marquee.Item key={hotline.id}>
                <Link
                  href={`tel:${hotline.tel}`}
                  display="inline-flex"
                  alignItems="center"
                  gap="1"
                  px="2.5"
                  py="1"
                  rounded="full"
                  whiteSpace="nowrap"
                  bg="whiteAlpha.200"
                  color="white"
                  _hover={{
                    bg: "whiteAlpha.300",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Icon>
                    <hotline.icon />
                  </Icon>
                  {hotline.label}: {hotline.number}
                </Link>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Box>
  );
}
