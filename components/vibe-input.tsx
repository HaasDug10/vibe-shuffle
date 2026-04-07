"use client";

import { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const vibeChips = [
  "pregame house music",
  "late night rainy drive",
  "gym PR mode",
  "sunday morning coffee",
  "rooftop sunset vibes",
  "focus mode coding",
];

interface VibeInputProps {
  onSubmit: (vibe: string) => void;
  isLoading?: boolean;
}

export function VibeInput({ onSubmit, isLoading }: VibeInputProps) {
  const [vibe, setVibe] = useState("");

  const handleSubmit = () => {
    if (vibe.trim()) {
      onSubmit(vibe.trim());
    }
  };

  const handleChipClick = (chipVibe: string) => {
    setVibe(chipVibe);
    onSubmit(chipVibe);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50" />
        <div className="relative flex items-center gap-3 bg-card border border-border rounded-2xl p-2 shadow-lg">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Describe your vibe..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg focus:outline-none py-3"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!vibe.trim() || isLoading}
            size="lg"
            className="rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Play className="h-5 w-5 fill-current" />
            <span className="hidden sm:inline">Shuffle</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {vibeChips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-all hover:scale-105 border border-border/50"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
