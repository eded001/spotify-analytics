"use client";

import List from "@/components/List";
import Link from "next/dist/client/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#000000] border-t border-white/5 py-5 overflow-hidden">
            <nav className="md:hidden flex justify-center mb-10">
                <List
                    className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em]"
                    separator={<span className="text-zinc-700">/</span>}
                    items={[
                        <Link href="/" key="Home" className="text-[#1db954] hover:text-white transition-colors">Home</Link>,
                        <Link href="/about" key="About" className="text-[#1db954] hover:text-white transition-colors">Sobre</Link>,
                        <Link href="/privacy-policy" key="Privacy" className="text-[#1db954] hover:text-white transition-colors">Privacidade</Link>,
                        <Link href="/contact" key="Contact" className="text-[#1db954] hover:text-white transition-colors">Contato</Link>,
                        <Link href="/faq" key="FAQ" className="text-[#1db954] hover:text-white transition-colors">Dúvidas</Link>
                    ]}
                />
            </nav>

            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-0.5 bg-[#1db954] mb-2 opacity-50"></div>

                <div className="text-white text-lg md:text-xl font-black uppercase italic tracking-tighter">
                    Made by
                    <span className="ml-2 text-[#1db954] hover:text-black transition-all px-1 inline-block">
                        <Link
                            href="https://eded001.github.io/portfolio/"
                            target="_blank"
                        >
                            Edgar Augusto
                        </Link>
                    </span>
                </div>

                {/* Copyright/Ano Minimalista */}
                <span className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest mt-4">
                    © {new Date().getFullYear()} Spotify Analytics — All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}