import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

import { users, games, highlights, teams } from "../shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client);

  const allUsers = await db.select().from(users);
  const allGames = await db.select().from(games);
  const allHighlights = await db.select().from(highlights);
  const allTeams = await db.select().from(teams);

  console.log("Users:");
  console.table(allUsers);

  console.log("Games:");
  console.table(allGames);

  console.log("Highlights:");
  console.table(allHighlights);

  console.log("Teams:");
  console.table(allTeams);

  await client.end();
}

main().catch((err) => {
  console.error("❌ Error fetching data:", err);
  process.exit(1);
});
