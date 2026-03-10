import SpotifyStory from "@/components/SpotifyStory";

export default function Page() {

    const token = localStorage.getItem("spotify_access_token");

    return (
        <main>
            <SpotifyStory token={token!} />
        </main>
    );
}