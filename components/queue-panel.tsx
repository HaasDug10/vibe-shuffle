"use client";

import { Music, GripVertical } from "lucide-react";

interface QueueItem {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: string;
}

interface QueuePanelProps {
  queue: QueueItem[];
  onSelectTrack?: (id: string) => void;
}

export function QueuePanel({ queue, onSelectTrack }: QueuePanelProps) {
  if (queue.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Up Next
        </h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Your queue is empty. Start by entering a vibe!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Music className="h-5 w-5 text-primary" />
        Up Next
        <span className="ml-auto text-sm font-normal text-muted-foreground">
          {queue.length} tracks
        </span>
      </h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {queue.map((track, index) => (
          <button
            key={track.id}
            onClick={() => onSelectTrack?.(track.id)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group text-left"
          >
            <span className="w-6 text-center text-sm text-muted-foreground group-hover:hidden">
              {index + 1}
            </span>
            <GripVertical className="w-6 h-4 text-muted-foreground hidden group-hover:block cursor-grab" />
            <div
              className="w-12 h-12 rounded-lg shrink-0 bg-secondary"
              style={{
                backgroundImage: `url(${track.artwork})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {track.artist}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {track.duration}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
