"use client";

export const dynamic = "force-dynamic";

import {
    getProfile,
    getTopArtists,
    getRecentTracks,
    getTopTracks,
    getPlaylists,
    getNowPlaying,
    getFollowedArtists,
} from "@/lib/spotify";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Play, Music2 } from "lucide-react";

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
    return (
        <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">
            {title}
        </h2>
    );
}

function Divider() {
    return <div className="border-t border-neutral-800/60 my-10" />;
}

function TrackRow({ name, artists, imageUrl, index }: {
    name: string;
    artists: string;
    imageUrl: string;
    index: number;
}) {
    return (
        <div className="group flex items-center gap-4 py-2.5 cursor-pointer">
            <span className="w-4 text-right text-xs text-neutral-600 flex-shrink-0 group-hover:hidden">
                {index + 1}
            </span>
            <Play
                size={12}
                className="hidden group-hover:block flex-shrink-0 text-neutral-400 fill-neutral-400 ml-auto w-4"
            />
            <div className="rounded overflow-hidden flex-shrink-0 bg-neutral-800">
                <Image src={imageUrl} width={40} height={40} alt={name} className="block" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-200 truncate group-hover:text-white transition-colors">
                    {name}
                </p>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{artists}</p>
            </div>
        </div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("spotify_access_token")
            : null;

    const opts = { enabled: !!token };
    const q = (key: string, fn: () => Promise<any>) =>
        useQuery({ queryKey: [key], queryFn: fn, ...opts });

    const profileQuery = q("spotify-profile", () => getProfile(token!));
    const artistsQuery = q("spotify-top-artists", () => getTopArtists(token!));
    const recentQuery = q("spotify-recent-tracks", () => getRecentTracks(token!));
    const topTracksQuery = q("spotify-top-tracks", () => getTopTracks(token!));
    const playlistsQuery = q("spotify-playlists", () => getPlaylists(token!));
    const nowPlayingQuery = q("spotify-now-playing", () => getNowPlaying(token!));
    const followedQuery = q("spotify-followed-artists", () => getFollowedArtists(token!));

    const isLoading =
        !token ||
        [profileQuery, artistsQuery, recentQuery, topTracksQuery,
            playlistsQuery, nowPlayingQuery, followedQuery].some(q => q.isLoading);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                    <div className="w-4 h-4 rounded-full border border-neutral-600 border-t-transparent animate-spin" />
                    Carregando...
                </div>
            </div>
        );
    }

    const profile = profileQuery.data;
    const artists = artistsQuery.data;
    const recentTracks = recentQuery.data;
    const topTracks = topTracksQuery.data;
    const playlists = playlistsQuery.data;
    const nowPlaying = nowPlayingQuery.data;
    const followed = followedQuery.data;

    if (!profile || !artists || !recentTracks) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-500 text-sm">Não foi possível carregar os dados.</p>
            </div>
        );
    }

    const nowTrack = nowPlaying?.item;
    const progressPct = nowTrack
        ? Math.round((nowPlaying.progress_ms / nowTrack.duration_ms) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="max-w-3xl mx-auto px-8 py-14">

                {/* ── Profile ────────────────────────────────────────── */}
                <section className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800">
                        <Image
                            src={profile.images?.[0]?.url || "/default-avatar.png"}
                            alt="profile"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white leading-tight">
                            {profile.display_name}
                        </h1>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            {(profile.followers?.total ?? 0).toLocaleString("pt-BR")} seguidores
                            {profile.product && (
                                <span className="ml-2 text-neutral-600">· {profile.product}</span>
                            )}
                        </p>
                    </div>
                </section>

                {/* ── Now Playing ────────────────────────────────────── */}
                {nowTrack && (
                    <>
                        <section className="flex items-center gap-4">
                            <div className="rounded overflow-hidden flex-shrink-0 bg-neutral-800">
                                <Image
                                    src={nowTrack.album?.images?.[2]?.url || "/default-cover.png"}
                                    width={48}
                                    height={48}
                                    alt={nowTrack.name}
                                    className="block"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Music2 size={11} className="text-[#1DB954] flex-shrink-0" />
                                    <span className="text-[10px] text-[#1DB954] uppercase tracking-widest font-medium">
                                        Tocando agora
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-white truncate">{nowTrack.name}</p>
                                <p className="text-xs text-neutral-500 truncate mt-0.5">
                                    {nowTrack.artists?.map((a: any) => a.name).join(", ")}
                                </p>
                                <div className="mt-2 h-px bg-neutral-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-neutral-500 rounded-full"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>
                        </section>
                        <Divider />
                    </>
                )}

                {/* ── Top Artists ────────────────────────────────────── */}
                <section>
                    <SectionHeader title="Top Artistas" />
                    <div className="grid grid-cols-5 gap-3">
                        {artists.items?.map((artist: any, i: number) => (
                            <div key={artist.id} className="group cursor-pointer">
                                <div className="relative rounded-lg overflow-hidden aspect-square bg-neutral-800">
                                    <Image
                                        src={artist.images?.[0]?.url || "/default-cover.png"}
                                        alt={artist.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <span className="absolute bottom-1.5 left-2 text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
                                        {i + 1}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-neutral-400 truncate group-hover:text-neutral-200 transition-colors">
                                    {artist.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <Divider />

                {/* ── Followed Artists ───────────────────────────────── */}
                {followed?.artists?.items?.length > 0 && (
                    <>
                        <section>
                            <SectionHeader title="Artistas Seguidos" />
                            <div className="grid grid-cols-5 gap-3">
                                {followed.artists.items.map((artist: any) => (
                                    <div key={artist.id} className="group cursor-pointer flex flex-col items-center text-center">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-800 mb-2">
                                            <Image
                                                src={artist.images?.[0]?.url || "/default-cover.png"}
                                                alt={artist.name}
                                                width={56}
                                                height={56}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <p className="text-xs text-neutral-400 truncate w-full group-hover:text-neutral-200 transition-colors">
                                            {artist.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <Divider />
                    </>
                )}

                {/* ── Top Tracks + Recent ────────────────────────────── */}
                <div className="grid grid-cols-2 gap-10">
                    {topTracks?.items?.length > 0 && (
                        <section>
                            <SectionHeader title="Top Músicas" />
                            <div className="divide-y divide-neutral-800/50">
                                {topTracks.items.map((track: any, i: number) => (
                                    <TrackRow
                                        key={track.id}
                                        index={i}
                                        name={track.name}
                                        artists={track.artists?.map((a: any) => a.name).join(", ")}
                                        imageUrl={track.album?.images?.[2]?.url || "/default-cover.png"}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <SectionHeader title="Ouvidas Recentemente" />
                        <div className="divide-y divide-neutral-800/50">
                            {recentTracks.items?.map((item: any, i: number) => (
                                <TrackRow
                                    key={item.played_at}
                                    index={i}
                                    name={item.track?.name}
                                    artists={item.track?.artists?.map((a: any) => a.name).join(", ")}
                                    imageUrl={item.track?.album?.images?.[2]?.url || "/default-cover.png"}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── Playlists ──────────────────────────────────────── */}
                {playlists?.items?.length > 0 && (
                    <>
                        <Divider />
                        <section>
                            <SectionHeader title="Playlists" />
                            <div className="grid grid-cols-5 gap-3">
                                {playlists.items.map((pl: any) => (
                                    <div key={pl.id} className="group cursor-pointer">
                                        <div className="relative rounded-lg overflow-hidden aspect-square bg-neutral-800">
                                            <Image
                                                src={pl.images?.[0]?.url || "/default-cover.png"}
                                                alt={pl.name}
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/50 rounded-full p-1.5">
                                                    <Play size={14} className="text-white fill-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-neutral-400 truncate group-hover:text-neutral-200 transition-colors">
                                            {pl.name}
                                        </p>
                                        <p className="text-[10px] text-neutral-600 mt-0.5">
                                            {pl.tracks?.total ?? 0} músicas
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

            </div>
        </div>
    );
}