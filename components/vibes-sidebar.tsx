"use client";

import { Bookmark, Clock, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavedVibe {
  id: string;
  name: string;
  trackCount: number;
  color: string;
}

interface RecentPrompt {
  id: string;
  text: string;
  timestamp: string;
}

interface VibesSidebarProps {
  savedVibes: SavedVibe[];
  recentPrompts: RecentPrompt[];
  onSelectVibe: (vibe: SavedVibe) => void;
  onSelectPrompt: (prompt: string) => void;
  onDeleteVibe?: (id: string) => void;
}

export function VibesSidebar({
  savedVibes,
  recentPrompts,
  onSelectVibe,
  onSelectPrompt,
  onDeleteVibe,
}: VibesSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Saved Vibes */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          Saved Vibes
        </h3>
        {savedVibes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No saved vibes yet. Save your favorite vibes to replay later!
          </p>
        ) : (
          <div className="space-y-2">
            {savedVibes.map((vibe) => (
              <div
                key={vibe.id}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: vibe.color }}
                >
                  <Play className="h-4 w-4 text-white" />
                </div>
                <button
                  onClick={() => onSelectVibe(vibe)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {vibe.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {vibe.trackCount} tracks
                  </p>
                </button>
                {onDeleteVibe && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteVibe(vibe.id)}
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Prompts */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Prompts
        </h3>
        {recentPrompts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Your recent vibe searches will appear here.
          </p>
        ) : (
          <div className="space-y-1">
            {recentPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onSelectPrompt(prompt.text)}
                className="w-full text-left p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {prompt.text}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {prompt.timestamp}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
