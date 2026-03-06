export default function Header() {
    return (
        <header className="w-full flex items-center justify-between p-5">
            <div>
                <h1 className="text-3xl text-[#1db954] font-bold">Spolytics</h1>
                <p className="text-sm text-gray-400">Your Spotify Analytics Dashboard</p>
            </div>

            <nav>
                <ul className="flex gap-8 text-sm text-gray-300 font-medium">
                    <li className="hover:text-[#1db954] cursor-pointer transition">
                        Home
                    </li>
                    <li className="hover:text-[#1db954] cursor-pointer transition">
                        About
                    </li>
                    <li className="hover:text-[#1db954] cursor-pointer transition">
                        Privacy Policy
                    </li>
                    <li className="hover:text-[#1db954] cursor-pointer transition">
                        Contact
                    </li>
                </ul>
            </nav>
        </header>
    );
}