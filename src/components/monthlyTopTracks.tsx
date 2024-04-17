"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import line from "../../public/line.svg";
import Link from "next/link";

interface Track {
  title: string;
  artist: string;
  url: string;
}
export default function MonthlyTopTracks() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("/api/monthly-tracks");
        if (response.ok) {
          const data = await response.json();
          setTopTracks(data);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch top tracks:", response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
        setIsLoading(false);
      }
    };
    fetchTopTracks();
  }, []);

  return (
    <div>
      <div className="flex h-full items-start">
        <div className="mr-6">
          <Image
            src={line}
            alt="gradient line"
            width={286}
            height={12}
            className="h-full w-full"
          />
        </div>
        <div className="flex h-full w-full flex-col gap-1">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-start gap-4 rounded-lg border border-cardBorder bg-background p-4 text-dark transition-all duration-75 ease-linear">
                  <Skeleton width={24} height={24} baseColor="#FFD4BB" highlightColor="#FF886E"/>
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="font-medium text-primary">
                      <Skeleton width={100} baseColor="#FF9C87" />
                    </h1>
                    <p className="text-xs text-dark/80">
                      <Skeleton width={60} baseColor="#FFD4BB" highlightColor="#FF886E" />
                    </p>
                  </div>
                </div>
              ))
            : topTracks.map((tracks, index) => (
                <Link
                  key={index}
                  href={tracks.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-start gap-4 rounded-lg border border-cardBorder bg-background p-4 text-dark transition-all duration-75 ease-linear hover:border-primary hover:bg-cardBg">
                  <p className="text-lg font-medium text-primary">
                    {index + 1}.
                  </p>
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="font-medium text-primary">{tracks.title}</h1>
                    <p className="text-xs text-dark/80">{tracks.artist}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
