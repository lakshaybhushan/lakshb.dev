import React, { useEffect, useState } from "react";
import getNowPlayingItem, { type NowPlayingItem } from "../utils/spotify";
import { FaSpotify } from "react-icons/fa6";

const SpotifyNowPlaying: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [result, setResult] = useState<NowPlayingItem>({
		albumImageUrl: "",
		artist: "No Artist",
		isPlaying: false,
		songUrl: "",
		title: "No Title",
	});

	const fetchNowPlaying = async () => {
		try {
			const songData = await getNowPlayingItem();
			if (songData) {
				setResult(songData);
			}
		} catch (error) {
			console.error("Error fetching now playing item:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNowPlaying();

		const pollingInterval = setInterval(() => {
			fetchNowPlaying();
		}, 3500);

		return () => {
			clearInterval(pollingInterval);
		};
	}, []);

	return (
		<>
			{loading ? (
				<div className="flex items-center gap-2 text-sm text-body underline-offset-4 transition duration-300 ease-in-out hover:text-primary hover:underline">
					<FaSpotify />
					<span>Loading...</span>
				</div>
			) : result.isPlaying ? (
				<a href={result.songUrl} rel="noopener noreferrer" target="_blank">
					<div className="flex">
						{result.albumImageUrl ? (
							<img
								src={result.albumImageUrl}
								alt="Album Art"
								width={45}
								className="rounded-md"
							/>
						) : (
							<img
								src="/icons/Afternoon.svg"
								width={45}
								height={45}
								alt="fallbackImage"
							/>
						)}
						<div className="ml-3 mt-1 flex flex-col items-start justify-center">
							<h3 className=" text-xs font-medium text-black underline-offset-4 transition duration-150 ease-in-out hover:text-primary hover:underline">
								{result.title}
							</h3>
							<p className=" text-xs text-black underline-offset-4 transition duration-150 ease-in-out hover:text-primary hover:underline">
								{result.artist}
							</p>
						</div>
					</div>
				</a>
			) : (
				<a
					href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
					rel="noopener noreferrer"
					target="_blank">
					<div className="flex items-center gap-2 text-sm text-body underline-offset-4 transition duration-300 ease-in-out hover:text-primary hover:underline">
						<FaSpotify />
						<span>Not listening to spotify</span>
					</div>
				</a>
			)}
		</>
	);
};

export default SpotifyNowPlaying;
