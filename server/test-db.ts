import { db } from './db';
import { games } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function testDB() {
  try {
    const inserted = await db.insert(games).values({
      id: 'test123',
      date: new Date(),
      teams: ['A', 'B'],
      highlightIds: [],
    }).returning();

    console.log('Inserted:', inserted);

    const queried = await db.select().from(games).where(eq(games.id, 'test123'));
    console.log('Queried:', queried);

    await db.delete(games).where(eq(games.id, 'test123'));
    console.log('Cleanup complete.');
  } catch (error) {
    console.error('DB Test Error:', error);
  }
}

testDB();
