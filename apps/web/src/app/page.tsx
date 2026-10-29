import type { Metadata } from "next";
import { getDb } from "@lib/db";
import { HotlinesBar } from "@components/hotlines-bar";

export const metadata: Metadata = {
  title: "BetterBayombong.ph",
};

export default async function HomePage() {
  const db = getDb();
  const hotlines = await db.hotline.findMany();

  return (
    <>
      <HotlinesBar hotlines={hotlines} />
    </>
  );
}
