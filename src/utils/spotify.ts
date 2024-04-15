import { NextRequest, NextResponse } from "next/server"

const getAccessToken = async () => {
  const refresh_token: string = process.env.SPOTIFY_REFRESH_TOKEN || ""
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
  return response.json()
}

export const topTracks = async (timeRange: "short_term" | "medium_term" | "long_term") => {
  const { access_token } = await getAccessToken();
  return fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const currentlyPlayingSong = async () => {
  const { access_token } = await getAccessToken()
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function GET(request: NextRequest) {
  try {
    const tokenResponse = await getAccessToken()
    return NextResponse.json(tokenResponse)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
