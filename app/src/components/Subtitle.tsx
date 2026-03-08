export default function Subtitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-center text-4xl font-bold text-[#34c065] mb-4">
            {children}
        </h2>
    );
}