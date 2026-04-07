"use client";

import {
  Heart,
  ThumbsDown,
  SkipForward,
  Bookmark,
  Volume2,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  vibeExplanation: string;
}

interface NowPlayingProps {
  song: Song | null;
  currentVibe: string;
  onLike: () => void;
  onDislike: () => void;
  onSkip: () => void;
  onSaveVibe: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
}

export function NowPlaying({
  song,
  currentVibe,
  onLike,
  onDislike,
  onSkip,
  onSaveVibe,
  isLiked,
  isSaved,
}: NowPlayingProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);

  if (!song) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-32 h-32 bg-secondary rounded-2xl flex items-center justify-center mb-6">
          <Volume2 className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Ready to shuffle?
        </h3>
        <p className="text-muted-foreground">
          Enter your vibe above to start discovering music
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Current Vibe Badge */}
      <div className="flex items-center justify-center">
        <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
          {currentVibe}
        </span>
      </div>

      {/* Artwork */}
      <div className="relative aspect-square max-w-[280px] mx-auto">
        <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full opacity-50" />
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(${song.artwork})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Song Info */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-foreground truncate">
          {song.title}
        </h2>
        <p className="text-lg text-muted-foreground">{song.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1:24</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Play Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDislike}
          className="h-12 w-12 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isPlaying ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="h-7 w-7 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSkip}
          className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={onLike}
          className={`gap-2 rounded-full ${
            isLiked
              ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
              : ""
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          Like
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={onSaveVibe}
          className={`gap-2 rounded-full ${
            isSaved
              ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
              : ""
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          Save Vibe
        </Button>
      </div>

      {/* Vibe Explanation */}
      <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary font-medium">Why this track: </span>
          {song.vibeExplanation}
        </p>
      </div>
    </div>
  );
}
