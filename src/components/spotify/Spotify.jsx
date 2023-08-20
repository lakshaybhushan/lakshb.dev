"use client";
import React, { useEffect, useState } from "react";
import getNowPlayingItem from "@/components/utils/spotifyapi";
import PlayingAnimation from "./PlayingAnimation";
import { SpotifyLogo } from "@/components/utils/spotifyicon";
import Image from "next/image";
import Link from "next/link";

const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({
    albumImageUrl: "",
    artist: "No Artist",
    isPlaying: false,
    songUrl: "",
    title: "No Title",
  });

  const fetchNowPlaying = () => {
    getNowPlayingItem(
      props.client_id,
      props.client_secret,
      props.refresh_token,
    ).then((songData) => {
      setResult(songData);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNowPlaying();

    const pollingInterval = setInterval(() => {
      fetchNowPlaying();
    }, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [props.client_id, props.client_secret, props.refresh_token]);

  return (
    <>
      {loading ? (
        <div className="flex items-center gap-2.5">
          <SpotifyLogo className="text-2xl" />
          <p>Lakshay is offline</p>
        </div>
      ) : result !== null &&
        result.isPlaying !== undefined &&
        result.isPlaying ? (
        <Link href={result.songUrl} rel="noopener noreferrer" target="_blank">
          <div className="flex">
            {result.albumImageUrl ? (
              <img src={result.albumImageUrl} alt="Art" width={55} />
            ) : (
              <Image
                src="/nothing.webp"
                width={55}
                height={55}
                alt="fallbackImage"
              />
            )}
            <div className="ml-4 flex flex-col items-start justify-end">
              <p className="text-white">{result.title}</p>
              <div className="flex">
                <p>{result.artist}</p>
                <PlayingAnimation />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
          rel="noopener noreferrer"
          target="_blank">
          <div className="flex items-center gap-2.5">
            <SpotifyLogo className="text-2xl" />
            <p>Lakshay is offline</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default SpotifyNowPlaying;
