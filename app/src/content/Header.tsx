"use client";

import Anchor from "@/components/Anchor";
import List from "@/components/List";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5 md:px-12 flex justify-between items-center">

            {/* LOGO / TÍTULO + SLOGAN */}
            <div className="flex items-center gap-4 group cursor-default">
                <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic whitespace-nowrap">
                    Spotify<span className="text-[#1DB954]">Analytics</span>
                </h1>

                {/* SLOGAN AO LADO (Oculto em telas muito pequenas para não quebrar o layout) */}
                <span className="hidden lg:block text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 border-l border-white/10 pl-4 py-1">
                    Data-Driven Music Insights
                </span>
            </div>

            {/* NAVEGAÇÃO ESTILO EDITORIAL */}
            <nav className="hidden md:block">
                <List
                    className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
                    items={[
                        <Anchor
                            href="/"
                            key="Home"
                            className="hover:text-[#1DB954] transition-colors border-b-2 border-transparent hover:border-[#1DB954] pb-1"
                        >
                            Home
                        </Anchor>,
                        <Anchor
                            href="/about"
                            key="About"
                            className="hover:text-[#1DB954] transition-colors border-b-2 border-transparent hover:border-[#1DB954] pb-1"
                        >
                            Sobre
                        </Anchor>,
                        <Anchor
                            href="/privacy-policy"
                            key="Privacy Policy"
                            className="hover:text-[#1DB954] transition-colors border-b-2 border-transparent hover:border-[#1DB954] pb-1"
                        >
                            Privacidade
                        </Anchor>,
                        <Anchor
                            href="/contact"
                            key="Contact"
                            className="hover:text-[#1DB954] transition-colors border-b-2 border-transparent hover:border-[#1DB954] pb-1"
                        >
                            Contato
                        </Anchor>,
                        <Anchor
                            href="/faq"
                            key="FAQ"
                            className="hover:text-[#1DB954] transition-colors border-b-2 border-transparent hover:border-[#1DB954] pb-1"
                        >
                            Dúvidas
                        </Anchor>
                    ]}
                />
            </nav>

            {/* ELEMENTO DECORATIVO MOBILE */}
            <div className="md:hidden flex flex-col gap-1.5 items-end">
                <div className="w-8 h-[3px] bg-white"></div>
                <div className="w-5 h-[3px] bg-[#1DB954]"></div>
            </div>
        </header>
    );
}