import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base schema for users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Games collection schema
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sport: text("sport").notNull(),
  isLive: boolean("is_live").default(false),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  description: text("description"),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  views: true,
  createdAt: true,
  updatedAt: true,
});

// Highlights collection schema
export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id"),
  title: text("title").notNull(),
  clipUrl: text("clip_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  duration: text("duration"),
  views: integer("views").default(0),
  sport: text("sport").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true,
  views: true,
  createdAt: true,
});

// Teams collection schema
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sport: text("sport").notNull(),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type Highlight = typeof highlights.$inferSelect;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
