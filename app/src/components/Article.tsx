export default function Article({ children }: { children: React.ReactNode }) {
    return (
        <article className="p-5 md:mx-52 mx-auto">
            {children}
        </article>
    );
}