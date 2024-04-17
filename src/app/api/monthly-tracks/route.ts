import { NextRequest, NextResponse } from "next/server";
import { topTracks } from "@/utils/spotify";

export async function GET(request: NextRequest) {
  try {
    const response = await topTracks("short_term");
    const { items } = await response.json();
    const tracks = items.slice(0, 4).map((track: any) => ({
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      url: track.external_urls.spotify,
      coverImage: track.album.images[0].url,
    }));
    return NextResponse.json(tracks, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
