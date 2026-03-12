"use client";

export const dynamic = "force-dynamic";

import {
    getProfile,
    getTopArtists,
    getRecentTracks,
    getTopTracks,
    getPlaylists,
    getNowPlaying,
    getFollowedArtists
} from "@/lib/spotify";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Play, Music2, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Componentes de UI (Semânticos) ──────────────────────────────────────────

function SectionLabel({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                {title}
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-800/50 ml-4" />
        </div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const router = useRouter();

    const token = typeof window !== "undefined" ? localStorage.getItem("spotify_access_token") : null;
    const opts = { enabled: !!token, refetchInterval: 30000 }; // Atualiza a cada 30s

    const q = (key: string, fn: () => Promise<any>) =>
        useQuery({
            queryKey: [key],
            queryFn: fn,
            ...opts
        });

    const profileQuery = q("spotify-profile", () => getProfile(token!));
    const artistsQuery = q("spotify-top-artists", () => getTopArtists(token!));
    const recentQuery = q("spotify-recent-tracks", () => getRecentTracks(token!));
    const nowPlayingQuery = q("spotify-now-playing", () => getNowPlaying(token!));

    const isLoading = !token || [profileQuery, artistsQuery, recentQuery, nowPlayingQuery].some(q => q.isLoading);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <div className="w-5 h-5 border-2 border-zinc-800 border-t-[#1DB954] rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sincronizando Dados</p>
            </div>
        );
    }

    const profile = profileQuery.data;
    const artists = artistsQuery.data;
    const recentTracks = recentQuery.data;
    const nowPlaying = nowPlayingQuery.data;

    const nowTrack = nowPlaying?.item;
    const progressPct = nowTrack ? (nowPlaying.progress_ms / nowTrack.duration_ms) * 100 : 0;

    return (
        <div className="min-h-screen bg-black text-zinc-400 selection:bg-[#1DB954]/30">
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

                {/* ─── HEADER: PROFILE ─── */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-[#1DB954] to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition" />
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-800">
                                <Image
                                    src={profile?.images?.[0]?.url || "/default-avatar.png"}
                                    alt="Profile" fill className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-white tracking-tight">{profile?.display_name}</h1>
                            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                                {profile?.followers?.total.toLocaleString()} Seguidores
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/create")}
                        className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-[#1DB954] transition-all active:scale-95"
                    >
                        Gerar Story Digital
                        <ArrowUpRight size={14} />
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* ─── COLUNA ESQUERDA: LISTAS ─── */}
                    <main className="lg:col-span-7 space-y-16">

                        {/* RECENTLY PLAYED */}
                        <section>
                            <SectionLabel title="Atividade Recente" />
                            <div className="space-y-1">
                                {recentTracks?.items?.slice(0, 6).map((item: any, i: number) => (
                                    <div key={i} className="group flex items-center gap-4 p-2 rounded-sm hover:bg-zinc-900/40 transition-colors cursor-default border-b border-zinc-900/50">
                                        <span className="text-[10px] font-mono text-zinc-700 w-4 tracking-tighter">0{i + 1}</span>
                                        <div className="w-10 h-10 relative shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                            <Image src={item.track.album.images[0].url} alt="Cover" fill className="rounded-sm" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">{item.track.name}</h4>
                                            <p className="text-[11px] text-zinc-500 truncate">{item.track.artists[0].name}</p>
                                        </div>
                                        <span className="text-[9px] font-bold text-zinc-700 uppercase">{new Date(item.played_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* TOP ARTISTS GRID */}
                        <section>
                            <SectionLabel title="Principais Artistas" />
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {artists?.items?.slice(0, 4).map((artist: any) => (
                                    <div key={artist.id} className="group cursor-default">
                                        <div className="aspect-square relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-sm">
                                            <Image src={artist.images[0].url} alt={artist.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="mt-3 text-[11px] font-bold text-zinc-500 uppercase tracking-tight truncate group-hover:text-white transition-colors">{artist.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* ─── COLUNA DIREITA: STATUS ─── */}
                    <aside className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">

                            {/* NOW PLAYING CARD */}
                            <section className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-sm relative overflow-hidden">
                                <SectionLabel title="Sincronizado Agora" />

                                {nowTrack ? (
                                    <div className="relative z-10">
                                        <div className="flex gap-6 items-center mb-8">
                                            <div className="w-24 h-24 relative shrink-0 shadow-2xl">
                                                <Image src={nowTrack.album.images[0].url} alt="Cover" fill className="rounded-sm object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                                                    <span className="text-[9px] font-black text-[#1DB954] uppercase tracking-[0.2em]">Live Stream</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white leading-tight mb-1">{nowTrack.name}</h3>
                                                <p className="text-sm text-zinc-500 truncate">{nowTrack.artists.map((a: any) => a.name).join(", ")}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="h-[2px] w-full bg-zinc-800">
                                                <div
                                                    className="h-full bg-[#1DB954] transition-all duration-1000"
                                                    style={{ width: `${progressPct}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[9px] font-mono text-zinc-600 uppercase">
                                                <span>Active</span>
                                                <span>{Math.floor(progressPct)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-sm">
                                        <Music2 size={24} className="text-zinc-700 mb-2" />
                                        <p className="text-[10px] uppercase font-bold text-zinc-600">Nenhum áudio ativo</p>
                                    </div>
                                )}
                            </section>

                            {/* INSIGHT BOX */}
                            <div className="p-6 bg-[#1DB954]/5 border border-[#1DB954]/10 rounded-sm">
                                <p className="text-xs text-zinc-400 leading-relaxed italic">
                                    "Sua curadoria atual inclina-se para o <span className="text-white font-medium">foco técnico</span> e ritmos lineares."
                                </p>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}