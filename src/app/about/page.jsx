"use client";
import React, { useState, useEffect } from "react";
import { getTopTracks } from "@/components/utils/spotifyapi";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FooterComp from "@/components/footer/Footer";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const tracks = await getTopTracks("short_term", 5); // Fetching top 5 tracks for the short term
        setTopTracks(tracks);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  useEffect(() => {
    const scrollDirection = scrollY.getPrevious() > scrollY.get() ? "up" : "down";

    if (inView) {
      controls.start((index) => ({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay:
            scrollDirection === "up"
              ? (topTracks.length - index - 1) * 0.2
              : index * 0.2,
        },
      }));
    } else {
      controls.start({ y: scrollDirection === "up" ? -20 : 20, opacity: 0 });
    }
  }, [controls, inView, topTracks, scrollY]);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="min-h-screen"></div>
      <div className="pt-24">
        <h1 className="mb-6 text-3xl font-bold">Top Tracks</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <ul className="space-y-4">
            {topTracks.map((track, index) => (
              <motion.li
                key={index}
                ref={ref}
                className="flex items-center space-x-4"
                initial={{ y: scrollY.getPrevious() > scrollY.get() ? -20 : 20, opacity: 0 }}
                animate={controls}
                custom={index} // Pass the index to the custom prop
              >
                <Link
                  href={track.external_urls.spotify}
                  passHref
                  className="relative h-16 w-16 overflow-hidden rounded-md"
                >
                  <Image
                    src={track.album.images[0]?.url || "/nothing.webp"}
                    layout="fill"
                    objectFit="cover"
                    alt="Album Art"
                  />
                </Link>
                <div>
                  <h2 className="text-lg font-semibold">{track.name}</h2>
                  <p className="text-sm text-gray-600">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* <FooterComp /> */}

      <div className="min-h-screen"></div>
    </main>
  );
};

export default TopTracks;