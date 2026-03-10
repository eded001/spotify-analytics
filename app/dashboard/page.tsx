"use client";

export const dynamic = "force-dynamic";

import { getProfile, getTopArtists, getRecentTracks } from "@/lib/spotify";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Dashboard() {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("spotify_access_token")
            : null;

    const profileQuery = useQuery({
        queryKey: ["spotify-profile"],
        queryFn: () => getProfile(token as string),
        enabled: !!token
    });

    const artistsQuery = useQuery({
        queryKey: ["spotify-artists"],
        queryFn: () => getTopArtists(token as string),
        enabled: !!token
    });

    const tracksQuery = useQuery({
        queryKey: ["spotify-tracks"],
        queryFn: () => getRecentTracks(token as string),
        enabled: !!token
    });

    if (
        !token ||
        profileQuery.isLoading ||
        artistsQuery.isLoading ||
        tracksQuery.isLoading
    ) {
        return (
            <p className="p-10 text-white">
                Carregando...
            </p>
        );
    }

    const profile = profileQuery.data;
    const artists = artistsQuery.data;
    const tracks = tracksQuery.data;

    if (!profile || !artists || !tracks) {
        return (
            <p className="p-10 text-white">
                Não foi possível carregar os dados.
            </p>
        );
    }

    return (
        <main className="p-10 max-w-5xl mx-auto text-white">

            <section className="flex items-center gap-4 mb-10">

                <Image
                    src={profile.images?.[0]?.url || "/default-avatar.png"}
                    alt="profile"
                    className="w-20 h-20 rounded-full"
                    width={80}
                    height={80}
                />

                <div>
                    <h1 className="text-2xl font-bold">
                        {profile.display_name}
                    </h1>

                    <p className="text-gray-400">
                        {profile.followers?.total ?? 0} seguidores
                    </p>
                </div>

            </section>

            <section className="mb-10">

                <h2 className="text-xl font-bold mb-4">
                    Top Artistas
                </h2>

                <div className="grid grid-cols-5 gap-4">

                    {artists.items?.map((artist: any) => (

                        <div key={artist.id}>

                            <Image
                                src={artist.images?.[0]?.url || "/default-cover.png"}
                                alt={artist.name}
                                className="rounded-lg"
                                width={200}
                                height={200}
                            />

                            <p className="text-sm mt-2">
                                {artist.name}
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            <section>

                <h2 className="text-xl font-bold mb-4">
                    Últimas músicas
                </h2>

                <div className="flex flex-col gap-3">

                    {tracks.items?.map((item: any) => (

                        <div
                            key={item.played_at}
                            className="flex items-center gap-3"
                        >

                            <Image
                                src={item.track?.album?.images?.[2]?.url || "/default-cover.png"}
                                className="w-12 h-12"
                                width={48}
                                height={48}
                                alt={item.track?.name}
                            />

                            <div>

                                <p>
                                    {item.track?.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {item.track?.artists
                                        ?.map((a: any) => a.name)
                                        .join(", ")}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    );
}