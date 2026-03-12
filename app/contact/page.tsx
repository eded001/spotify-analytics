export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <header className="mb-16">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Contato</h1>
                <p className="text-zinc-500 mt-2 text-sm">Canais de comunicação para suporte e parcerias.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <section>
                    <h3 className="text-[#1DB954] text-[10px] font-bold uppercase tracking-widest mb-4">Comunicação Direta</h3>
                    <a href="mailto:edgarams.profissional@gmail.com" className="text-xl text-zinc-200 hover:text-[#1DB954] transition-colors border-b border-zinc-800 pb-1 block w-fit">
                        edgarams.profissional@gmail.com
                    </a>
                </section>

                <section>
                    <h3 className="text-[#1DB954] text-[10px] font-bold uppercase tracking-widest mb-4">Recursos Externos</h3>
                    <div className="flex gap-6">
                        <a href="https://github.com/eded001" target="_blank" className="text-zinc-400 text-sm hover:text-white underline decoration-zinc-800 underline-offset-8">GitHub</a>
                        <a href="https://eded001.github.io/portfolio/" target="_blank" className="text-zinc-400 text-sm hover:text-white underline decoration-zinc-800 underline-offset-8">Portfólio</a>
                    </div>
                </section>
            </div>
        </div>
    );
}