import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

import { users, games, highlights, teams } from "../shared/schema";
import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client);

  // Resets tables each seed run
  await db.delete(users);
  await db.delete(games);
  await db.delete(teams);
  await db.delete(highlights);

  // Seed users
  for (let i = 0; i < 10; i++) {
    await db.insert(users).values({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }

  // Seed teams
  for (let i = 0; i < 5; i++) {
    await db.insert(teams).values({
      name: faker.company.name(),
      sport: faker.helpers.arrayElement(["Soccer", "Basketball", "Baseball"]),
      logoUrl: faker.image.avatar(),
    });
  }

  // Seed games
  for (let i = 0; i < 10; i++) {
    await db.insert(games).values({
      title: faker.lorem.words(3),
      sport: faker.helpers.arrayElement(["Soccer", "Basketball", "Baseball"]),
      isLive: faker.datatype.boolean(),
      videoUrl: faker.internet.url(),
      thumbnailUrl: faker.image.url(),
      startTime: faker.date.recent(),
      endTime: faker.date.soon(),
      description: faker.lorem.sentence(),
    });
  }

  // Seed highlights
  for (let i = 0; i < 10; i++) {
    await db.insert(highlights).values({
      title: faker.lorem.words(2),
      clipUrl: faker.internet.url(),
      thumbnailUrl: faker.image.url(),
      duration: `${faker.number.int({ min: 30, max: 300 })} seconds`,
      sport: faker.helpers.arrayElement(["Soccer", "Basketball", "Baseball"]),
    });
  }

  console.log("✅ Seeding complete!");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
