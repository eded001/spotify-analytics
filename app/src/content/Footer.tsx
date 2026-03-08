import Anchor from "@/components/Anchor";
import List from "@/components/List";
import Link from "next/dist/client/link";

export default function Footer() {
    return (
        <footer className="w-full text-center text-gray-3001 pb-5">
            <nav className="md:hidden flex justify-center">
                <List
                    className="flex gap-2 text-sm font-medium"
                    separator={<span className="text-zinc-500">|</span>}
                    items={[
                        <Link href="/" key="Home" className="text-[#1db954] hover:underline">Home</Link>,
                        <Link href="/about" key="About" className="text-[#1db954] hover:underline">About</Link>,
                        <Link href="/privacy-policy" key="Privacy Policy" className="text-[#1db954] hover:underline">Privacy Policy</Link>,
                        <Link href="/contact" key="Contact" className="text-[#1db954] hover:underline">Contact</Link>,
                        <Link href="/faq" key="FAQ" className="text-[#1db954] hover:underline">FAQ</Link>
                    ]}
                />
            </nav>

            <p className="text-[#e8f8ee] pt-5">Made by <Anchor href="https://eded001.github.io/portfolio/" target="_blank">Edgar Augusto</Anchor></p>
        </footer>
    );
}