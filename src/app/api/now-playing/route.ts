import { NextRequest, NextResponse } from "next/server"
import { currentlyPlayingSong } from "@/utils/spotify"

export async function POST(request: NextRequest) {
  const response = await currentlyPlayingSong()
  if (response.status === 204) {
    return NextResponse.json({ isPlaying: false, isOffline: true })
  }
  if (response.status > 400) {
    return NextResponse.json({ isPlaying: false, isOffline: false })
  }
  const song = await response.json()
  if (song.item === null) {
    return NextResponse.json({ isPlaying: false, isOffline: false })
  }
  const isPlaying: boolean = song.is_playing
  const title: string = song.item.name
  const artist: string = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ")
  const album: string = song.item.album.name
  const albumImageUrl: string = song.item.album.images[0].url
  const songUrl: string = song.item.external_urls.spotify
  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    isOffline: false,
  })
}
