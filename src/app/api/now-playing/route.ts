import { NextRequest, NextResponse } from "next/server";
import { currentlyPlayingSong } from "@/utils/spotify";

export async function POST(request: NextRequest) {
  try {
    const response = await currentlyPlayingSong();
    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      console.error(
        "Failed to fetch currently playing song:",
        response.statusText,
      );
      return NextResponse.json(
        { error: "Failed to fetch currently playing song" },
        { status: 500 },
      );
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying: boolean = song.is_playing;
    const title: string = song.item.name;
    const artist: string = song.item.artists
      .map((_artist: any) => _artist.name)
      .join(", ");
    const album: string = song.item.album.name;
    const albumImageUrl: string = song.item.album.images[0].url;
    const songUrl: string = song.item.external_urls.spotify;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the currently playing song" },
      { status: 500 },
    );
  }
}
