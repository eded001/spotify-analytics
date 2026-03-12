"use client";

import Paragraph from "@/components/Paragraph";
import { BsSpotify } from "react-icons/bs";

export default function Home() {
  const handleSpotifyLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "";
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ?? "";
    const scope = [
      "user-read-email",
      "user-top-read",
      "user-read-recently-played"
    ].join(" ");
    const responseType = "code";

    // Endpoint oficial corrigido
    const authUrl =
      "https://accounts.spotify.com/authorize" +
      "?client_id=" + clientId +
      "&response_type=" + responseType +
      "&redirect_uri=" + encodeURIComponent(redirectUri) +
      "&scope=" + encodeURIComponent(scope);

    window.location.href = authUrl;
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-6 overflow-hidden min-h-screen">
      {/* 1. ELEMENTOS DECORATIVOS DE FUNDO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#1db954] opacity-[0.05] blur-[120px] rounded-full -z-10" />

      {/* 2. CONTEÚDO EDITORIAL */}
      <div className="max-w-4xl text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 italic">
          CRIE SEU <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>CARTAZ MUSICAL</span>
        </h1>

        <div className="max-w-lg mb-12">
          <Paragraph justify="center">
            <span className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
              Interessado em <b className="text-white">gerar insights</b>, compartilhar descobertas e saber mais sobre você baseado no <b className="text-[#1db954]">seu gosto musical</b>?
            </span>
          </Paragraph>
          <p className="text-zinc-500 mt-4 text-sm font-bold uppercase tracking-widest">
            Veja tudo isso com apenas um click.
          </p>
        </div>

        {/* 3. BOTÃO PREMIUM */}
        <button
          onClick={handleSpotifyLogin}
          className="group relative flex items-center gap-4 bg-[#1db954] text-black font-black uppercase tracking-tighter text-xl px-10 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(29,185,84,0.3)]"
        >
          <BsSpotify size={28} className="group-hover:rotate-12 transition-transform" />
          Conectar agora

          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>
      </div>
    </main>
  );
}