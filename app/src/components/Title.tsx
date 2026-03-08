export default function Title({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-center text-4xl font-bold text-[#1db954] mb-4">
            {children}
        </h1>
    );
}