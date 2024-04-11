const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const basic = btoa(`${client_id}:${client_secret}`);

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();
  return data.access_token;
};

export const getNowPlaying = async () => {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch currently playing song");
    }

    return response.json();
  } catch (error) {
    console.error("Error in getNowPlaying:", error);
    throw error;
  }
};

export default async function getNowPlayingItem() {
  try {
    const song = await getNowPlaying();

    if (!song) {
      return {
        albumImageUrl: "",
        artist: "No Artist",
        isPlaying: false,
        songUrl: "",
        title: "No Title",
      };
    }

    const albumImageUrl = song.item.album.images[0]?.url || "";
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };
  } catch (error) {
    console.error("Error in getNowPlayingItem:", error);
    return null;
  }
}

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export const getTopTracks = async (time_range = "short_term", limit = 5) => {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(
      `${TOP_TRACKS_ENDPOINT}?time_range=${time_range}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error in getTopTracks:", error);
    throw error;
  }
};
