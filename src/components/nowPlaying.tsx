"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa6";

interface CurrentlyPlaying {
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
  songUrl: string;
}

export default function NowPlaying() {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch("/api/now-playing", {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            if (data.isPlaying) {
              setCurrentlyPlaying(data);
            } else {
              setCurrentlyPlaying(null);
              setIsOffline(data.isOffline);
            }
          }
        } else {
          console.error(
            "Failed to fetch currently playing song:",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching currently playing song:", error);
      }
    };

    fetchCurrentlyPlaying();
    const intervalId = setInterval(fetchCurrentlyPlaying, 3500);

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, []);

  if (isOffline) {
    return (
      <Link
        href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 text-dark transition-all duration-150 ease-linear hover:text-primary/80">
        <FaSpotify size={16} />
        <p>Long time no see!</p>
      </Link>
    );
  }

  return (
    <div>
      {currentlyPlaying ? (
        <Link
          href={currentlyPlaying.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-dark transition-all duration-150 ease-linear hover:text-primary/80">
          <Image
            src={currentlyPlaying.albumImageUrl}
            alt="Album cover"
            width={500}
            height={500}
            className="h-12 w-12 rounded-md"
          />
          <div>
            <h1 className="font-medium">{currentlyPlaying.title}</h1>
            <p className="text-xs">{currentlyPlaying.artist}</p>
          </div>
        </Link>
      ) : (
        <Link
          href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-dark transition-all duration-150 ease-linear hover:text-primary/80">
          <FaSpotify size={16} />
          <p>Lakshay is offline</p>
        </Link>
      )}
    </div>
  );
}
