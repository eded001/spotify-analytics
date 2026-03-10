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
import { Play, PlayCircle } from "lucide-react";

// ─── Shared sub-components ───────────────────────────────────────────────────

function SectionHeader({ title, count, label }: { title: string; count?: number; label?: string }) {
    return (
        <div className="flex items-baseline gap-4 mb-7">
            <h2 className="text-3xl font-black uppercase tracking-wide text-white">{title}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
            {count !== undefined && (
                <span className="text-[11px] text-white/30 tracking-[2px] uppercase">
                    {count} {label}
                </span>
            )}
        </div>
    );
}

function TrackRow({ name, artists, imageUrl, index }: {
    name: string;
    artists: string;
    imageUrl: string;
    index: number;
}) {
    return (
        <div className="group relative flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-[#1DB954] rounded-full group-hover:h-[55%] transition-all duration-200" />
            <span className="text-lg font-black text-white/15 w-6 text-right flex-shrink-0">{index + 1}</span>
            <div className="rounded-md overflow-hidden flex-shrink-0 bg-white/5">
                <Image src={imageUrl} width={44} height={44} alt={name} className="block" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">{name}</p>
                <p className="text-xs text-white/35 font-light mt-0.5 truncate">{artists}</p>
            </div>
            <PlayCircle
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#1DB954]"
                size={18}
                strokeWidth={1.5}
            />
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

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
        profileQuery.isLoading ||
        artistsQuery.isLoading ||
        recentQuery.isLoading ||
        topTracksQuery.isLoading ||
        playlistsQuery.isLoading ||
        nowPlayingQuery.isLoading ||
        followedQuery.isLoading;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#1DB954] border-t-transparent animate-spin" />
                    <p className="text-white/40 text-sm tracking-widest">Carregando sua música...</p>
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
            <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                <p className="text-white/40 text-sm">Não foi possível carregar os dados.</p>
            </div>
        );
    }

    const nowTrack = nowPlaying?.item;
    const progressPct = nowTrack
        ? Math.round((nowPlaying.progress_ms / nowTrack.duration_ms) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-[#080808] relative overflow-hidden">

            {/* Background glows */}
            <div className="fixed -top-52 -left-52 w-[600px] h-[600px] rounded-full bg-[#1DB954]/10 blur-3xl pointer-events-none" />
            <div className="fixed -bottom-52 -right-24 w-[500px] h-[500px] rounded-full bg-[#1DB954]/[0.06] blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-10 py-16">

                {/* Top label */}
                <div className="flex items-center gap-3 mb-10">
                    <span className="block w-6 h-px bg-[#1DB954]" />
                    <span className="text-[#1DB954] text-[11px] tracking-[4px] font-medium uppercase">
                        Seu Painel Musical
                    </span>
                </div>

                {/* ── Profile ───────────────────────────────────────────── */}
                <section className="flex items-end gap-7 mb-16 pb-10 border-b border-white/[0.06]">
                    <div className="relative flex-shrink-0 w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1DB954] via-[#0d8c40] to-[#1DB954] animate-spin [animation-duration:8s]" />
                        <div className="absolute inset-[3px] rounded-full overflow-hidden bg-[#111]">
                            <Image
                                src={profile.images?.[0]?.url || "/default-avatar.png"}
                                alt="profile"
                                width={90}
                                height={90}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-6xl font-black uppercase tracking-tight text-white leading-none">
                            {profile.display_name}
                        </h1>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 bg-[#1DB954]/10 border border-[#1DB954]/25 rounded-full px-3 py-1 text-[#1DB954] text-xs font-medium tracking-wide">
                                ♪ {(profile.followers?.total ?? 0).toLocaleString("pt-BR")} seguidores
                            </span>
                            {profile.product && (
                                <span className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/50 text-xs font-medium tracking-wide uppercase">
                                    {profile.product}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Now Playing ───────────────────────────────────────── */}
                {nowTrack && (
                    <section className="mb-16">
                        <SectionHeader title="Tocando Agora" />
                        <div className="flex items-center gap-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                            <div className="relative flex-shrink-0">
                                <div className="rounded-xl overflow-hidden">
                                    <Image
                                        src={nowTrack.album?.images?.[1]?.url || "/default-cover.png"}
                                        width={80}
                                        height={80}
                                        alt={nowTrack.name}
                                        className="block"
                                    />
                                </div>
                                {/* pulsing dot */}
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#1DB954] animate-pulse" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-white truncate">{nowTrack.name}</p>
                                <p className="text-sm text-white/40 truncate mt-0.5">
                                    {nowTrack.artists?.map((a: any) => a.name).join(", ")}
                                </p>
                                <p className="text-xs text-white/25 truncate mt-0.5">{nowTrack.album?.name}</p>
                                {/* progress bar */}
                                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#1DB954] rounded-full transition-all"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>
                            {/* equalizer bars animation */}
                            <div className="flex-shrink-0 flex items-end gap-0.5 h-8">
                                {[3, 5, 4, 6, 3].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-[#1DB954] rounded-sm animate-bounce"
                                        style={{
                                            height: `${h * 4}px`,
                                            animationDelay: `${i * 0.12}s`,
                                            animationDuration: "0.8s",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Top Artists ───────────────────────────────────────── */}
                <section className="mb-16">
                    <SectionHeader title="Top Artistas" count={artists.items?.length} label="artistas" />
                    <div className="grid grid-cols-5 gap-5">
                        {artists.items?.map((artist: any, i: number) => (
                            <div key={artist.id} className="group cursor-pointer">
                                <div className="relative rounded-xl overflow-hidden aspect-square bg-white/5">
                                    <Image
                                        src={artist.images?.[0]?.url || "/default-cover.png"}
                                        alt={artist.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="absolute top-2 left-2.5 text-xl font-black text-white/60 leading-none drop-shadow-lg">
                                        #{i + 1}
                                    </span>
                                </div>
                                <p className="mt-2.5 text-sm font-medium text-white/80 truncate group-hover:text-white transition-colors">
                                    {artist.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Followed Artists ──────────────────────────────────── */}
                {followed?.artists?.items?.length > 0 && (
                    <section className="mb-16">
                        <SectionHeader title="Artistas Seguidos" count={followed.artists.items.length} label="artistas" />
                        <div className="grid grid-cols-5 gap-5">
                            {followed.artists.items.map((artist: any) => (
                                <div key={artist.id} className="group cursor-pointer flex flex-col items-center text-center">
                                    <div className="relative w-20 h-20 mb-3">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent group-hover:from-[#1DB954]/30 transition-all duration-300" />
                                        <div className="absolute inset-[2px] rounded-full overflow-hidden bg-white/5">
                                            <Image
                                                src={artist.images?.[0]?.url || "/default-cover.png"}
                                                alt={artist.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-white/80 truncate w-full group-hover:text-white transition-colors">
                                        {artist.name}
                                    </p>
                                    <p className="text-[11px] text-white/30 mt-0.5">
                                        {(artist.followers?.total ?? 0).toLocaleString("pt-BR")} fãs
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Top Tracks + Recent — side by side ────────────────── */}
                <div className="grid grid-cols-2 gap-10 mb-16">

                    {/* Top Tracks */}
                    {topTracks?.items?.length > 0 && (
                        <section>
                            <SectionHeader title="Top Músicas" count={topTracks.items.length} label="faixas" />
                            <div className="flex flex-col gap-1">
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

                    {/* Recent Tracks */}
                    <section>
                        <SectionHeader title="Últimas Músicas" count={recentTracks.items?.length} label="faixas" />
                        <div className="flex flex-col gap-1">
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

                {/* ── Playlists ─────────────────────────────────────────── */}
                {playlists?.items?.length > 0 && (
                    <section>
                        <SectionHeader title="Playlists" count={playlists.items.length} label="playlists" />
                        <div className="grid grid-cols-5 gap-5">
                            {playlists.items.map((pl: any) => (
                                <div key={pl.id} className="group cursor-pointer">
                                    <div className="relative rounded-xl overflow-hidden aspect-square bg-white/5">
                                        <Image
                                            src={pl.images?.[0]?.url || "/default-cover.png"}
                                            alt={pl.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Play
                                                size={36}
                                                className="text-[#1DB954]"
                                                strokeWidth={1.5}
                                                fill="#1DB954"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2.5 text-sm font-medium text-white/80 truncate group-hover:text-white transition-colors">
                                        {pl.name}
                                    </p>
                                    <p className="text-[11px] text-white/30 mt-0.5">
                                        {pl.tracks?.total ?? 0} músicas
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}