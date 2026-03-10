const BASE = "https://api.spotify.com/v1";

function headers(token: string) {
    return { Authorization: `Bearer ${token}` };
}

async function getProfile(token: string) {
    const res = await fetch(`${BASE}/me`, { headers: headers(token) });
    return res.json();
}

async function getTopArtists(token: string) {
    const res = await fetch(`${BASE}/me/top/artists?limit=5`, { headers: headers(token) });
    return res.json();
}

async function getRecentTracks(token: string) {
    const res = await fetch(`${BASE}/me/player/recently-played?limit=5`, { headers: headers(token) });
    return res.json();
}

async function getTopTracks(token: string) {
    const res = await fetch(`${BASE}/me/top/tracks?limit=5`, { headers: headers(token) });
    return res.json();
}

async function getPlaylists(token: string) {
    const res = await fetch(`${BASE}/me/playlists?limit=5`, { headers: headers(token) });
    return res.json();
}

async function getNowPlaying(token: string) {
    const res = await fetch(`${BASE}/me/player/currently-playing`, { headers: headers(token) });
    if (res.status === 204) return null; // nothing playing
    return res.json();
}

async function getFollowedArtists(token: string) {
    const res = await fetch(`${BASE}/me/following?type=artist&limit=5`, { headers: headers(token) });
    return res.json();
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