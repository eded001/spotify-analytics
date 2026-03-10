import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { code } = await req.json();

    if (!code) {
        return NextResponse.json(
            { error: "missing_code" },
            { status: 400 }
        );
    }

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!
    });

    const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

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