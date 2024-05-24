const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const client_id = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.PUBLIC_SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.PUBLIC_SPOTIFY_REFRESH_TOKEN as string;

interface SpotifyTokenResponse {
	access_token: string;
}

interface SpotifyImage {
	url: string;
}

interface SpotifyArtist {
	name: string;
}

interface SpotifyExternalUrls {
	spotify: string;
}

interface SpotifyItem {
	album: {
		images: SpotifyImage[];
	};
	artists: SpotifyArtist[];
	external_urls: SpotifyExternalUrls;
	name: string;
}

interface SpotifyNowPlayingResponse {
	is_playing: boolean;
	item: SpotifyItem;
}

export interface NowPlayingItem {
	albumImageUrl: string;
	artist: string;
	isPlaying: boolean;
	songUrl: string;
	title: string;
}

const getAccessToken = async (): Promise<string> => {
	const basic = btoa(`${client_id}:${client_secret}`);

	const params = new URLSearchParams();
	params.append("grant_type", "refresh_token");
	params.append("refresh_token", refresh_token);

	try {
		const response = await fetch(TOKEN_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: params,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch access token: ${errorText}`);
		}

		const data: SpotifyTokenResponse = await response.json();
		return data.access_token;
	} catch (error) {
		console.error("Error fetching access token:", error);
		throw error;
	}
};

export const getNowPlaying =
	async (): Promise<SpotifyNowPlayingResponse | null> => {
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
				const errorText = await response.text();
				throw new Error(`Failed to fetch currently playing song: ${errorText}`);
			}

			const responseBody = await response.text();
			if (!responseBody) {
				throw new Error("Response body is empty");
			}

			const data: SpotifyNowPlayingResponse = JSON.parse(responseBody);
			return data;
		} catch (error) {
			console.error("Error in getNowPlaying:", error);
			return null;
		}
	};

export default async function getNowPlayingItem(): Promise<NowPlayingItem | null> {
	try {
		const song = await getNowPlaying();

		if (!song || !song.item || !song.item.album) {
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
		return {
			albumImageUrl: "",
			artist: "No Artist",
			isPlaying: false,
			songUrl: "",
			title: "No Title",
		};
	}
}
