"use client";

import Paragraph from "@/components/Paragraph";
import { BsSpotify } from "react-icons/bs";

export default function Home() {
  const handleSpotifyLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = [
      "user-read-email",
      "user-top-read",
      "user-read-recently-played"
    ].join(" ");
    const responseType = "code";

    const authUrl =
      "https://accounts.spotify.com/authorize" +
      "?client_id=" + clientId +
      "&response_type=" + responseType +
      "&redirect_uri=" + encodeURIComponent(redirectUri) +
      "&scope=" + encodeURIComponent(scope);

    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Paragraph justify="center">
        Interessado em <b>gerar insights</b>, <b>compartilhar descobertas</b> e <b>saber mais de você</b> baseado no <b>seu gosto musical</b>?
        <br />
        Veja tudo isso com apenas um <b>click</b>!
      </Paragraph>

      <button
        onClick={handleSpotifyLogin}
        className="bg-[#1db954] rounded-2xl flex items-center font-medium text-xl p-2 gap-2 hover:cursor-pointer hover:bg-[#1aa74c] active:bg-[#179443]"
      >
        Entrar com Spotify
        <BsSpotify />
      </button>
    </div>
  );
}