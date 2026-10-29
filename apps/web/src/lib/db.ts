import { cache } from "react";
import { createDb } from "@betterbayombong/db";
import { env } from "cloudflare:workers";

export const getDb = cache(() => createDb(env.HYPERDRIVE.connectionString));
