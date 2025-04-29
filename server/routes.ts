import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSchema, insertHighlightSchema, insertTeamSchema } from "@shared/schema";
import multer from "multer";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API routes - prefix with /api
  
  // Games routes
  app.get("/api/games", async (req: Request, res: Response) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Error fetching games" });
    }
  });
  
  app.get("/api/games/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const game = await storage.getGameById(id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Error fetching game" });
    }
  });
  
  app.get("/api/live", async (req: Request, res: Response) => {
    try {
      const liveGames = await storage.getLiveGames();
      res.json(liveGames);
    } catch (error) {
      res.status(500).json({ message: "Error fetching live games" });
    }
  });
  
  app.get("/api/sports/:sport", async (req: Request, res: Response) => {
    try {
      const { sport } = req.params;
      const games = await storage.getGamesByFilters(sport);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Error fetching games by sport" });
    }
  });
  
  app.post("/api/upload", upload.single("video"), async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertGameSchema.parse(req.body);
      
      // In a real app, we would handle file upload here
      // For now, we'll just use the provided videoUrl and thumbnailUrl
      
      const newGame = await storage.createGame(validatedData);
      res.status(201).json(newGame);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      res.status(500).json({ message: "Error uploading game" });
    }
  });
  
  app.put("/api/games/:id/views", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const game = await storage.incrementViews(id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Error updating views" });
    }
  });
  
  // Highlights routes
  app.get("/api/highlights", async (req: Request, res: Response) => {
    try {
      const highlights = await storage.getAllHighlights();
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Error fetching highlights" });
    }
  });
  
  app.get("/api/highlights/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const highlight = await storage.getHighlightById(id);
      if (!highlight) {
        return res.status(404).json({ message: "Highlight not found" });
      }
      
      res.json(highlight);
    } catch (error) {
      res.status(500).json({ message: "Error fetching highlight" });
    }
  });
  
  app.post("/api/highlights", upload.single("clip"), async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertHighlightSchema.parse(req.body);
      
      // In a real app, we would handle file upload here
      // For now, we'll just use the provided clipUrl and thumbnailUrl
      
      const newHighlight = await storage.createHighlight(validatedData);
      res.status(201).json(newHighlight);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid highlight data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating highlight" });
    }
  });
  
  app.put("/api/highlights/:id/views", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const highlight = await storage.incrementHighlightViews(id);
      if (!highlight) {
        return res.status(404).json({ message: "Highlight not found" });
      }
      
      res.json(highlight);
    } catch (error) {
      res.status(500).json({ message: "Error updating views" });
    }
  });
  
  // Teams routes
  app.get("/api/teams", async (req: Request, res: Response) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teams" });
    }
  });
  
  app.get("/api/teams/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const team = await storage.getTeamById(id);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Error fetching team" });
    }
  });
  
  app.post("/api/teams", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertTeamSchema.parse(req.body);
      
      const newTeam = await storage.createTeam(validatedData);
      res.status(201).json(newTeam);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating team" });
    }
  });

  return httpServer;
}
