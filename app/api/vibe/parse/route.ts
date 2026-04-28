import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { searchSpotifyTracks } from "@/lib/spotify";

function fallbackParse(prompt: string) {
  const text = prompt.toLowerCase();

  const genres: string[] = [];
  const moods: string[] = [];

  if (text.includes("house")) genres.push("house");
  if (text.includes("rap") || text.includes("hip hop")) genres.push("hip-hop");
  if (text.includes("pop")) genres.push("pop");
  if (text.includes("jazz")) genres.push("jazz");
  if (text.includes("rock")) genres.push("rock");
  if (text.includes("edm")) genres.push("edm");

  if (text.includes("pregame") || text.includes("party") || text.includes("hype")) {
    moods.push("party", "hype");
  }
  if (text.includes("chill") || text.includes("relax")) {
    moods.push("chill");
  }
  if (text.includes("focus") || text.includes("study") || text.includes("coding")) {
    moods.push("focus");
  }
  if (text.includes("late night") || text.includes("rain")) {
    moods.push("moody");
  }

  let energy = 0.6;
  let tempoMin = 100;
  let tempoMax = 120;

  if (text.includes("pregame") || text.includes("gym") || text.includes("party")) {
    energy = 0.9;
    tempoMin = 120;
    tempoMax = 140;
  } else if (text.includes("chill") || text.includes("focus") || text.includes("rain")) {
    energy = 0.4;
    tempoMin = 70;
    tempoMax = 110;
  }

  return {
    genres,
    moods,
    energy,
    tempoMin,
    tempoMax,
  };
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    let parsed: {
      genres: string[];
      moods: string[];
      energy: number;
      tempoMin: number;
      tempoMax: number;
    };

    try {
      const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `
Return ONLY valid JSON for this music vibe.

"${prompt}"

{
  "genres": ["example"],
  "moods": ["example"],
  "energy": 0.8,
  "tempoMin": 120,
  "tempoMax": 130
}
`,
      });

      const r: any = response;
      const text =
        r.output_text ||
        r.output?.[0]?.content?.[0]?.text ||
        "";

      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        parsed = fallbackParse(prompt);
      } else {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch {
      parsed = fallbackParse(prompt);
    }

    const isLikelySong =
  prompt.split(" ").length <= 4 && 
  !prompt.toLowerCase().includes("vibe") &&
  !prompt.toLowerCase().includes("music");

    let searchQuery: string;

    if (isLikelySong) {
      searchQuery = `${prompt} song`;
    } else {
      const genrePart = parsed.genres?.join(" ") || "";
      const moodPart = parsed.moods?.join(" ") || "";
      searchQuery = `${genrePart} ${moodPart} music`.trim();
    }
  
    if (!searchQuery) {
      searchQuery = prompt;
    }

    const spotifyTracks = await searchSpotifyTracks(searchQuery);

    const tracks = spotifyTracks.map((track: any, index: number) => ({
      id: track.id || String(index + 1),
      title: track.name,
      artist: track.artists?.map((a: any) => a.name).join(", ") || "Unknown Artist",
      artwork: track.album?.images?.[0]?.url || "",
      vibeExplanation: `This track was matched using the vibe search: ${searchQuery}.`,
      duration: msToMinSec(track.duration_ms),
    }));

    return NextResponse.json({
      vibe: parsed,
      tracks,
    });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

function msToMinSec(ms: number) {
  if (!ms && ms !== 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}