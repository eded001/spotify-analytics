const BASE = "https://api.spotify.com/v1";

function headers(token: string) {
    console.log("[Spotify] Using token:", token ? "TOKEN_PRESENT" : "TOKEN_MISSING");
    return { Authorization: `Bearer ${token}` };
}

async function getProfile(token: string) {
    console.log("[Spotify] GET /me");

    const res = await fetch(`${BASE}/me`, { headers: headers(token) });

    console.log("[Spotify] /me status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me response:", data);

    return data;
}

async function getTopArtists(token: string) {
    console.log("[Spotify] GET /me/top/artists");

    const res = await fetch(`${BASE}/me/top/artists?limit=5`, { headers: headers(token) });

    console.log("[Spotify] /me/top/artists status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me/top/artists response:", data);

    return data;
}

async function getRecentTracks(token: string) {
    console.log("[Spotify] GET /me/player/recently-played");

    const res = await fetch(`${BASE}/me/player/recently-played?limit=5`, { headers: headers(token) });

    console.log("[Spotify] /me/player/recently-played status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me/player/recently-played response:", data);

    return data;
}

async function getTopTracks(token: string) {
    console.log("[Spotify] GET /me/top/tracks");

    const res = await fetch(`${BASE}/me/top/tracks?limit=5`, { headers: headers(token) });

    console.log("[Spotify] /me/top/tracks status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me/top/tracks response:", data);

    return data;
}

async function getPlaylists(token: string) {
    console.log("[Spotify] GET /me/playlists");

    const res = await fetch(`${BASE}/me/playlists?limit=5`, { headers: headers(token) });

    console.log("[Spotify] /me/playlists status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me/playlists response:", data);

    return data;
}

async function getNowPlaying(token: string) {
    console.log("[Spotify] GET /me/player/currently-playing");

    const res = await fetch(`${BASE}/me/player/currently-playing`, { headers: headers(token) });

    console.log("[Spotify] /currently-playing status:", res.status);

    if (res.status === 204) {
        console.log("[Spotify] Nothing is currently playing");
        return null;
    }

    const data = await res.json();
    console.log("[Spotify] /currently-playing response:", data);

    return data;
}

async function getFollowedArtists(token: string) {
    console.log("[Spotify] GET /me/following");

    const res = await fetch(`${BASE}/me/following?type=artist&limit=5`, { headers: headers(token) });

    console.log("[Spotify] /me/following status:", res.status);

    const data = await res.json();
    console.log("[Spotify] /me/following response:", data);

    return data;
}

export {
    getProfile,
    getTopArtists,
    getRecentTracks,
    getTopTracks,
    getPlaylists,
    getNowPlaying,
    getFollowedArtists,
};