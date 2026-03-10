async function getProfile(token: string) {
    const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

async function getTopArtists(token: string) {
    const res = await fetch(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.json();
}

async function getRecentTracks(token: string) {
    const res = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=5",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.json();
}

export { getProfile, getTopArtists, getRecentTracks };