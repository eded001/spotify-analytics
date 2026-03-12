export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <h1 className="text-3xl font-semibold text-white tracking-tight">Privacidade e Dados</h1>
                <p className="text-[#1DB954] mt-2 text-xs font-bold uppercase tracking-widest">Protocolos de Segurança</p>
            </header>

            <div className="space-y-10">
                <section>
                    <h2 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Escopo da API</h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        Operamos como uma aplicação *stateless* (sem estado) baseada na API oficial do Spotify. Ao autenticar, o sistema solicita acesso temporário para leitura do perfil e histórico de audição.
                    </p>
                </section>

                <div className="bg-zinc-900/20 border border-zinc-800 p-6 rounded-sm">
                    <h2 className="text-white text-xs font-bold uppercase mb-3 tracking-tighter">Compromisso de Armazenamento Zero</h2>
                    <p className="text-zinc-400 text-sm m-0 leading-relaxed">
                        Nenhum dado pessoal, histórico de faixas ou credenciais são armazenados em bancos de dados externos. Toda a análise é processada em memória e descartada ao encerrar a sessão.
                    </p>
                </div>

                <section className="pt-6 border-t border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-4">Gestão de permissões de terceiros:</p>
                    <a
                        href="https://www.spotify.com/account/apps/"
                        target="_blank"
                        className="inline-block text-[10px] font-black text-black bg-white px-4 py-2 hover:bg-[#1DB954] transition-colors uppercase tracking-widest"
                    >
                        Revogar Acesso via Spotify.com
                    </a>
                </section>
            </div>
        </div>
    );
}