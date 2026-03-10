import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { code } = await req.json();

    const client_id = process.env.SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

    const basic = Buffer.from(
        `${client_id}:${client_secret}`
    ).toString("base64");

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri
    });

    const res = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        }
    );

    const data = await res.json();

    return NextResponse.json(data);
}