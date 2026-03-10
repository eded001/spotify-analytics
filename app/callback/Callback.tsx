"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

export default function Callback() {

    const params = useSearchParams();

    useEffect(() => {

        const code = params.get("code");

        if (!code) return;

        fetch("/api/spotify/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        })
            .then(res => res.json())
            .then(data => {

                localStorage.setItem(
                    "spotify_access_token",
                    data.access_token
                );

                window.location.href = "/dashboard";

            });

    }, [params]);

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Title>Aguarde...</Title>
            <Paragraph>Você será redirecionado em breve.</Paragraph>
        </div>
    );
}