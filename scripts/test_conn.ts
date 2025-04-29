import "dotenv/config";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  await client.connect();
  console.log("Connection successful!");
  await client.end();
}

testConnection().catch((err) => console.error("Connection failed", err));
