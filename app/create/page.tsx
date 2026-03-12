"use client";

import { useEffect, useState } from "react";
import SpotifyStory from "@/components/SpotifyStory";

export default function Page() {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("spotify_access_token");
        setToken(storedToken);
    }, []);

    if (!token) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                Carregando...
            </main>
        );
    }

    return (
        <main>
            <SpotifyStory token={token} />
        </main>
    );
}