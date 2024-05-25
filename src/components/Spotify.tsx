import React, { useEffect, useState } from "react";
import getNowPlayingItem, { type NowPlayingItem } from "../utils/spotify";
import { FaSpotify } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

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
		<AnimatePresence mode="wait">
			{loading ? (
				<motion.a
					key="loading"
					variants={variants}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit="exit"
					href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
					rel="noopener noreferrer"
					target="_blank">
					<div className="flex items-center gap-2 text-sm text-body underline-offset-4 transition duration-300 ease-in-out hover:text-primary hover:underline">
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1CB955] text-black">
							<FaSpotify className="text-2xl" />
						</div>
						<p className="text-xs">
							<span className="font-medium text-black">Hold up</span>
							<br />
							Checking Lakshay's Spotify...
						</p>
					</div>
				</motion.a>
			) : result.isPlaying ? (
				<motion.a
					key={result.songUrl}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.3 }}
					href={result.songUrl}
					rel="noopener noreferrer"
					target="_blank">
					<div className="flex h-[45px]">
						{result.albumImageUrl ? (
							<motion.img
								src={result.albumImageUrl}
								alt="Album Art"
								width={45}
								className="rounded-md"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.3 }}
							/>
						) : (
							<motion.img
								src="/icons/Afternoon.svg"
								width={45}
								height={45}
								alt="fallbackImage"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.3 }}
							/>
						)}
						<motion.div
							className="ml-3 mt-1 flex flex-col items-start justify-center"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}>
							<h3 className="text-xs font-medium text-black underline-offset-4 transition duration-150 ease-in-out hover:text-primary hover:underline">
								{result.title}
							</h3>
							<p className="text-xs text-black underline-offset-4 transition duration-150 ease-in-out hover:text-primary hover:underline">
								{result.artist}
							</p>
						</motion.div>
					</div>
				</motion.a>
			) : (
				<motion.a
					key="not-playing"
					variants={variants}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit="exit"
					href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
					rel="noopener noreferrer"
					target="_blank">
					<div className="flex items-center gap-2 text-sm text-body underline-offset-4 transition duration-300 ease-in-out hover:text-primary hover:underline">
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1DB954] text-black">
							<FaSpotify className="text-2xl" />
						</div>
						<p className="text-xs">
							<span className="font-medium text-black">Not playing</span>
							<br />
							Click to view my profile.
						</p>
					</div>
				</motion.a>
			)}
		</AnimatePresence>
	);
};

export default SpotifyNowPlaying;
