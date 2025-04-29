import { Game, Highlight, Team } from "@shared/schema";

// Extend types as needed for frontend specific functionality
export interface GameWithStats extends Game {
  commentCount?: number;
  likeCount?: number;
}

export interface HighlightWithStats extends Highlight {
  commentCount?: number;
  likeCount?: number;
}

export interface SportFilter {
  name: string;
  value: string;
  count?: number;
}

export interface VideoFilter {
  name: string;
  value: string;
}

export interface UploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}
