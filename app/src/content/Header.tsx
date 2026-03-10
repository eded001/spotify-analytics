import Anchor from "@/components/Anchor";
import List from "@/components/List";

export default function Header() {
    return (
        <header className="flex justify-center md:justify-between items-center bg-zinc-900 p-5">
            <h1 className="text-4xl font-bold text-[#1db954]">Spotify Analytics</h1>

            <nav className="hidden md:block">
                <List
                    className="flex gap-8 font-medium"
                    items={[
                        <Anchor href="/" key="Home">Home</Anchor>,
                        <Anchor href="/about" key="About">Sobre</Anchor>,
                        <Anchor href="/privacy-policy" key="Privacy Policy">Política de Privacidade</Anchor>,
                        <Anchor href="/contact" key="Contact">Contato</Anchor>,
                        <Anchor href="/faq" key="FAQ">Dúvidas</Anchor>
                    ]}
                />
            </nav>
        </header>
    );
}