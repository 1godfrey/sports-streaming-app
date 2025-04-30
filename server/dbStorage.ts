import { db } from "./db";
import {
  User, InsertUser, users,
  Game, InsertGame, games,
  Highlight, InsertHighlight, highlights,
  Team, InsertTeam, teams
} from "@shared/schema";
import { IStorage } from "./storage";

export class DbStorage implements IStorage {
  // ===== USERS =====
  async getUser(id: number): Promise<User | undefined> {
    return db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, id)
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.query.users.findFirst({
      where: (u, { eq }) => eq(u.username, username)
    });
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // ===== GAMES =====
  async getAllGames(): Promise<Game[]> {
    return db.select().from(games);
  }

  async getLiveGames(): Promise<Game[]> {
    return db.select().from(games).where(games.isLive, true);
  }
  
  async getGamesByFilters(sport?: string): Promise<Game[]> {
    if (sport && sport !== "all") {
      return db.select().from(games).where(games.sport.eq(sport));
    }
    return db.select().from(games);
  }

  async getGameById(id: number): Promise<Game | undefined> {
    return db.query.games.findFirst({
      where: (g, { eq }) => eq(g.id, id)
    });
  }

  async createGame(game: InsertGame): Promise<Game> {
    const result = await db.insert(games).values(game).returning();
    return result[0];
  }

  async updateGame(id: number, updates: Partial<Game>): Promise<Game | undefined> {
    const result = await db.update(games)
      .set({ ...updates, updatedAt: new Date() })
      .where(games.id.eq(id))
      .returning();
    return result[0];
  }

  async incrementViews(id: number): Promise<Game | undefined> {
    await db.execute(
      db.update(games)
        .set({ views: db.raw(`${games.views} + 1`), updatedAt: new Date() })
        .where(games.id.eq(id))
    );
    return this.getGameById(id);
  }

  // ===== HIGHLIGHTS =====
  async getHighlightsByGameId(gameId: number): Promise<Highlight[]> {
    return db.select().from(highlights).where(highlights.gameId.eq(gameId));
  }

  async getAllHighlights(): Promise<Highlight[]> {
    return db.select().from(highlights);
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const result = await db.insert(highlights).values(highlight).returning();
    return result[0];
  }

  // ===== TEAMS =====
  async getTeamById(id: number): Promise<Team | undefined> {
    return db.query.teams.findFirst({
      where: (t, { eq }) => eq(t.id, id)
    });
  }

  async getAllTeams(): Promise<Team[]> {
    return db.select().from(teams);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const result = await db.insert(teams).values(team).returning();
    return result[0];
  }
}
