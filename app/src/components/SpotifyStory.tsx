"use client";

import { useEffect, useState, useRef } from "react";
import { throwConfetti } from "@/lib/utils"; // Opcional, se tiver
import { border, toPng } from "html-to-image";

import {
    getProfile,
    getTopArtists,
    getTopTracks
} from "@/lib/spotify";
import { DownloadIcon } from "lucide-react";

export default function SpotifyStoryMinimal({ token }: { token: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [profile, setProfile] = useState<any>(null);
    const [artists, setArtists] = useState<any>(null);
    const [tracks, setTracks] = useState<any>(null);

    useEffect(() => {
        async function load() {
            if (!token) return;
            const [p, a, t] = await Promise.all([
                getProfile(token),
                getTopArtists(token),
                getTopTracks(token)
            ]);
            setProfile(p);
            setArtists(a);
            setTracks(t);
        }
        load();
    }, [token]);

    const download = async () => {
        if (!ref.current) return;
        try {
            const dataUrl = await toPng(ref.current, {
                cacheBust: true,
                pixelRatio: 3,
            });
            const link = document.createElement("a");
            link.download = `spotify-minimal.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
        }
    };

    if (!profile || !artists || !tracks) return null;

    return (
        <div className="flex flex-col items-center gap-6 py-10 min-h-screen">

            {/* CONTAINER 9:16 (360x640) */}
            <div
                ref={ref}
                className="relative w-[360px] h-[640px] p-8 flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: '#FF5757', color: '#000000' }} // Fundo Vermelho Vibrante
            >
                {/* Elemento Geométrico de Fundo */}
                <div className="absolute -top-10 -left-10 w-40 h-40 border-[20px] border-black/5 rounded-full" />

                <div className="relative z-10 flex flex-col gap-6">
                    {/* 1. Header Minimalista */}
                    <div className="flex items-center gap-3">
                        <img
                            src={profile.images?.[0]?.url}
                            crossOrigin="anonymous"
                            className="w-10 h-10 rounded-full border-2 border-black object-cover"
                        />
                        <p className="text-xs font-black uppercase tracking-tighter truncate max-w-[200px]">
                            {profile.display_name}
                        </p>
                    </div>

                    {/* 2. Título (Reduzido para não empurrar o resto) */}
                    <h1 className="text-4xl font-black leading-[0.9] tracking-tighter uppercase italic">
                        MEUS<br />
                        <span style={{ color: '#FFFFFF' }}> FAVORITOS</span>
                    </h1>

                    {/* 3. Bloco de Conteúdo Principal */}
                    <div className="flex flex-col gap-8">
                        {/* Seção Artistas */}
                        <div className="w-full">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black mb-3 inline-block">
                                Top Artistas
                            </h2>
                            <div className="space-y-1">
                                {artists.items.slice(0, 3).map((a: any, i: number) => (
                                    <p key={a.id} className="text-lg font-black uppercase truncate leading-tight">
                                        <span className="opacity-30 mr-2 text-sm">0{i + 1}</span>{a.name}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Seção Músicas */}
                        <div className="w-full">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black mb-3 inline-block">
                                No Repeat
                            </h2>
                            <div className="space-y-3">
                                {tracks.items.slice(0, 3).map((t: any) => (
                                    <div key={t.id} className="leading-none max-w-full overflow-hidden">
                                        <p className="text-base font-black uppercase truncate">{t.name}</p>
                                        <p className="text-[9px] font-bold opacity-70 uppercase truncate">{t.artists[0].name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Footer (Sempre no fundo) */}
                <div className="relative z-10 flex justify-between items-end border-t border-black/10 pt-4">
                    <div className="bg-black text-[#FF5757] p-2 rounded">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.5c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-1 7.5-.5 10.3 1.2.3.2.4.6.3.8zm1.5-3.3c-.3.4-.8.5-1.1.3-2.8-1.7-7.1-2.2-10.5-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 4-1.2 8.7-.6 11.9 1.4.3.1.5.6.2 1zm.1-3.4c-3.4-2-9-2.2-12.2-1.2-.5.2-1.1-.1-1.3-.6-.2-.5.1-1.1.6-1.3 3.7-1.1 9.9-.9 13.8 1.4.5.3.6.9.3 1.4-.3.5-.9.6-1.2.3z" />
                        </svg>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] font-black uppercase tracking-widest leading-none">Spotify Analysis</p>
                        <p className="text-[12px] font-black uppercase italic">#MyRecap2026</p>
                    </div>
                </div>
            </div>

            {/* BOTÃO */}
            <button
                onClick={download}
                className="bg-[#1db954] rounded-2xl flex items-center font-medium text-xl p-2 gap-2 hover:cursor-pointer hover:bg-[#1aa74c] active:bg-[#179443]"
            >
                Baixar
                <DownloadIcon />
            </button>
        </div>
    );
}