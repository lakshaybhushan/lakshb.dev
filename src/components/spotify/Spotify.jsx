"use client";
import React, { useEffect, useState } from "react";
import getNowPlayingItem from "@/components/utils/spotifyapi";
import PlayingAnimation from "./PlayingAnimation";
import { SpotifyLogo } from "@/components/utils/spotifyicon";
import Image from "next/image";
import Link from "next/link";

const SpotifyNowPlaying = ({ client_id, client_secret, refresh_token }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({
    albumImageUrl: "",
    artist: "No Artist",
    isPlaying: false,
    songUrl: "",
    title: "No Title",
  });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const songData = await getNowPlayingItem(
        client_id,
        client_secret,
        refresh_token,
      );
      setResult(songData);
      setLoading(false);
    };

    fetchNowPlaying();
    const pollingInterval = setInterval(fetchNowPlaying, 5000);

    return () => clearInterval(pollingInterval);
  }, [client_id, client_secret, refresh_token]);

  if (loading) {
    return (
      <div className="flex items-center gap-2.5">
        <SpotifyLogo className="text-2xl" />
        <p>Lakshay is offline</p>
      </div>
    );
  }

  if (result?.isPlaying) {
    return (
      <Link href={result.songUrl} rel="noopener noreferrer" target="_blank">
        <div className="flex">
          <Image
            src={result.albumImageUrl || "/nothing.webp"}
            width={500}
            height={500}
            alt="Album Art"
            className="h-16 w-16 rounded-md"
          />
          <div className="ml-4 flex flex-col justify-center">
            <p className="text-base font-medium text-white">{result.title}</p>
            <p className="text-sm">{result.artist}</p>
            <PlayingAnimation />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
      rel="noopener noreferrer"
      target="_blank">
      <div className="flex items-center gap-2.5">
        <SpotifyLogo className="text-lg md:text-2xl" />
        <p>Lakshay is offline</p>
      </div>
    </Link>
  );
};

export default SpotifyNowPlaying;
