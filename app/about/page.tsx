export default function About() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Sobre o Projeto</h1>
                <p className="text-zinc-500 mt-2 text-xs uppercase tracking-[0.2em]">Documentação Institucional</p>
            </header>

            <div className="space-y-6">
                <p className="text-zinc-300 leading-relaxed">
                    O <span className="text-white font-medium">Spotify Analytics</span> é uma plataforma de visualização de dados musicais projetada para converter métricas de streaming em insights visuais. Inspirado pelo Receiptify, o sistema expande a análise de consumo para oferecer uma interface clara e minimalista.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-10 py-8 border-y border-zinc-800/50">
                    <div>
                        <h3 className="text-[#1DB954] text-[10px] font-bold uppercase tracking-widest mb-4">Referências</h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li><a href="https://trackify.am/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">Trackify</a></li>
                            <li><a href="http://spotify.com/stats" target="_blank" className="text-zinc-400 hover:text-white transition-colors">Stats for Spotify</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#1DB954] text-[10px] font-bold uppercase tracking-widest mb-4">Stack Técnica</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Desenvolvido com React, Next.js e Tailwind CSS, integrando-se diretamente à infraestrutura da Spotify Web API.
                        </p>
                    </div>
                </div>

                <p className="text-zinc-500 text-xs italic leading-relaxed">
                    Este projeto opera como um estudo de caso técnico para demonstração de conceitos de análise de dados e design de interface em tempo real.
                </p>
            </div>
        </div>
    );
}