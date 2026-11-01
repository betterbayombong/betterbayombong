import { cache } from "react";
import { env } from "cloudflare:workers";
import { createDb } from "@betterbayombong/db";

export const getDb = cache(() => createDb(env.HYPERDRIVE.connectionString));
