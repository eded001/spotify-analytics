export default function FAQ() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <h1 className="text-3xl font-semibold text-white tracking-tight">FAQ</h1>
                <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest italic">Perguntas Frequentes</p>
            </header>

            <div className="divide-y divide-zinc-800/50">
                <div className="py-10">
                    <h3 className="text-white font-medium text-lg mb-3 tracking-tight">Disponibilidade do Código-Fonte</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        O repositório oficial é público e pode ser auditado no GitHub através do endereço:
                        <a href="https://github.com/eded001/spotify-analytics" target="_blank" className="text-[#1DB954] ml-1 hover:underline">eded001/spotify-analytics</a>.
                    </p>
                </div>

                <div className="py-10">
                    <h3 className="text-white font-medium text-lg mb-3 tracking-tight">Integridade e Coleta de Dados</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        A aplicação não utiliza cookies de rastreio ou armazenamento persistente de dados do usuário. Para conformidade técnica, consulte nossa seção de
                        <a href="/privacy-policy" className="text-[#1DB954] ml-1 hover:underline">Privacidade</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}