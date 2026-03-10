"use client";

import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

import {
    getProfile,
    getTopArtists,
    getTopTracks
} from "@/lib/spotify";

export default function SpotifyStory({ token }: { token: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const [profile, setProfile] = useState<any>(null);
    const [artists, setArtists] = useState<any>(null);
    const [tracks, setTracks] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const p = await getProfile(token);
            const a = await getTopArtists(token);
            const t = await getTopTracks(token);

            setProfile(p);
            setArtists(a);
            setTracks(t);
        }

        load();
    }, [token]);

    async function download() {
        if (!ref.current) return;

        const canvas = await html2canvas(ref.current, {
            scale: 2
        });

        const url = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.download = "spotify-story.png";
        link.href = url;
        link.click();
    }

    if (!profile || !artists || !tracks) return null;

    return (
        <div className="flex flex-col items-center gap-6">

            <div
                ref={ref}
                className="w-[1080px] h-[1920px] bg-gradient-to-b from-[#1DB954] to-black text-white p-20 flex flex-col justify-between"
            >

                {/* HEADER */}
                <div>
                    <h1 className="text-6xl font-bold">
                        {profile.display_name}
                    </h1>

                    <p className="text-2xl opacity-80">
                        My Spotify Stats
                    </p>
                </div>

                {/* TOP ARTISTS */}
                <div>
                    <h2 className="text-4xl mb-6 font-semibold">
                        Top Artists
                    </h2>

                    {artists.items.slice(0, 3).map((artist: any, i: number) => (
                        <p key={artist.id} className="text-3xl">
                            {i + 1}. {artist.name}
                        </p>
                    ))}
                </div>

                {/* TOP TRACKS */}
                <div>
                    <h2 className="text-4xl mb-6 font-semibold">
                        Top Tracks
                    </h2>

                    {tracks.items.slice(0, 3).map((track: any, i: number) => (
                        <p key={track.id} className="text-3xl">
                            {i + 1}. {track.name}
                        </p>
                    ))}
                </div>

            </div>

            <button
                onClick={download}
                className="bg-green-500 px-6 py-3 rounded-lg text-white"
            >
                Baixar Story
            </button>

        </div>
    );
}