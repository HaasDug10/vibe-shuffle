"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { VibeInput } from "@/components/vibe-input";
import { NowPlaying } from "@/components/now-playing";
import { QueuePanel } from "@/components/queue-panel";
import { VibesSidebar } from "@/components/vibes-sidebar";

// Mock data for demonstration
const mockSongs = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    artwork:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    vibeExplanation:
      "The synth-driven anthem captures that late-night energy with its pulsing bassline and nostalgic 80s feel — perfect for your electric night drive mood.",
    duration: "4:03",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    artwork:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    vibeExplanation:
      "Retro-futuristic synths meet modern production, creating an irresistible groove that matches your energetic vibe.",
    duration: "3:20",
  },
  {
    id: "3",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    artwork:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    vibeExplanation:
      "The collaboration brings together slick production and confident vocals for that premium feel.",
    duration: "3:50",
  },
  {
    id: "4",
    title: "Nights",
    artist: "Frank Ocean",
    artwork:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    vibeExplanation:
      "A sonic journey that shifts halfway through, mirroring the transformative energy of late-night introspection.",
    duration: "5:07",
  },
  {
    id: "5",
    title: "Redbone",
    artist: "Childish Gambino",
    artwork:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    vibeExplanation:
      "Groovy, soulful, and hypnotic — this track brings that laid-back yet captivating atmosphere you&apos;re looking for.",
    duration: "5:26",
  },
];

const initialSavedVibes = [
  { id: "1", name: "Late Night Drive", trackCount: 24, color: "#10b981" },
  { id: "2", name: "Focus Mode", trackCount: 18, color: "#6366f1" },
  { id: "3", name: "Sunday Morning", trackCount: 12, color: "#f59e0b" },
];

const initialRecentPrompts = [
  { id: "1", text: "chill beats for coding", timestamp: "2 hours ago" },
  { id: "2", text: "energetic workout pump", timestamp: "Yesterday" },
  { id: "3", text: "rainy day jazz", timestamp: "2 days ago" },
];

export default function VibeShuffle() {
  const [currentVibe, setCurrentVibe] = useState<string>("");
  const [currentSong, setCurrentSong] = useState<(typeof mockSongs)[0] | null>(
    null
  );
  const [queue, setQueue] = useState<typeof mockSongs>([]);
  const [savedVibes, setSavedVibes] = useState(initialSavedVibes);
  const [recentPrompts, setRecentPrompts] = useState(initialRecentPrompts);
  const [isLoading, setIsLoading] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [isVibeSaved, setIsVibeSaved] = useState(false);

  const handleVibeSubmit = useCallback((vibe: string) => {
    setIsLoading(true);
    setCurrentVibe(vibe);
    setIsVibeSaved(false);

    // Add to recent prompts
    setRecentPrompts((prev) => {
      const filtered = prev.filter((p) => p.text !== vibe);
      return [
        { id: Date.now().toString(), text: vibe, timestamp: "Just now" },
        ...filtered,
      ].slice(0, 5);
    });

    // Simulate API call
    setTimeout(() => {
      const shuffled = [...mockSongs].sort(() => Math.random() - 0.5);
      setCurrentSong(shuffled[0]);
      setQueue(shuffled.slice(1));
      setIsLoading(false);
    }, 800);
  }, []);

  const handleLike = useCallback(() => {
    if (currentSong) {
      setLikedSongs((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(currentSong.id)) {
          newSet.delete(currentSong.id);
        } else {
          newSet.add(currentSong.id);
        }
        return newSet;
      });
    }
  }, [currentSong]);

  const handleDislike = useCallback(() => {
    if (queue.length > 0) {
      setCurrentSong(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue]);

  const handleSkip = useCallback(() => {
    if (queue.length > 0) {
      setCurrentSong(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue]);

  const handleSaveVibe = useCallback(() => {
    if (currentVibe && !isVibeSaved) {
      const colors = ["#10b981", "#6366f1", "#f59e0b", "#ec4899", "#8b5cf6"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setSavedVibes((prev) => [
        {
          id: Date.now().toString(),
          name: currentVibe,
          trackCount: queue.length + 1,
          color: randomColor,
        },
        ...prev,
      ]);
      setIsVibeSaved(true);
    }
  }, [currentVibe, queue.length, isVibeSaved]);

  const handleSelectVibe = useCallback(
    (vibe: { name: string }) => {
      handleVibeSubmit(vibe.name);
    },
    [handleVibeSubmit]
  );

  const handleDeleteVibe = useCallback((id: string) => {
    setSavedVibes((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Vibe Input Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              What&apos;s your vibe?
            </h2>
            <p className="text-muted-foreground text-lg">
              Describe how you&apos;re feeling and let AI curate the perfect
              playlist
            </p>
          </div>
          <VibeInput onSubmit={handleVibeSubmit} isLoading={isLoading} />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Now Playing & Queue */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NowPlaying
                song={currentSong}
                currentVibe={currentVibe}
                onLike={handleLike}
                onDislike={handleDislike}
                onSkip={handleSkip}
                onSaveVibe={handleSaveVibe}
                isLiked={currentSong ? likedSongs.has(currentSong.id) : false}
                isSaved={isVibeSaved}
              />
              <QueuePanel queue={queue} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <VibesSidebar
              savedVibes={savedVibes}
              recentPrompts={recentPrompts}
              onSelectVibe={handleSelectVibe}
              onSelectPrompt={handleVibeSubmit}
              onDeleteVibe={handleDeleteVibe}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
