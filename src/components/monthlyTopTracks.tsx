"use client"
import { useState, useEffect } from "react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

export default function MonthlyTopTracks() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("/api/monthly-tracks");
        if (response.ok) {
          const data = await response.json();
          setTopTracks(data);
        } else {
          console.error("Failed to fetch top tracks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-3xl font-bold">Top Tracks</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topTracks.map((track, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow-md">
            <div className="relative mb-4 h-40 w-full">

            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {track.title}
            </h2>
            <p className="text-sm text-gray-600">{track.artist}</p>
            <a href={track.url} className="no:underline text-rose-500">
              Listen on Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
