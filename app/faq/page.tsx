import Anchor from "@/components/Anchor";
import Article from "@/components/Article";
import Paragraph from "@/components/Paragraph";
import Separator from "@/components/Separator";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";

export default function About() {
    return (
        <Article>
            <Title>Dúvidas</Title>

            <section>
                <Subtitle>Onde posso acessar o código-fonte do projeto?</Subtitle>
                <Paragraph>O código do projeto está disponível no GitHub: <Anchor href="https://github.com/eded001/spotify-analytics" target="_blank">eded001/spotify-analytics</Anchor></Paragraph>
            </section>

            <Separator />

            <section>
                <Subtitle>O Spotify Analytics está roubando meus dados?</Subtitle>
                <Paragraph>A resposta é muito simples e é não. Para mais informações, leia mais sobre sobre o assunto na seção de <Anchor href="/privacy-policy" target="_self">Política de Privacidade</Anchor></Paragraph>
            </section>
        </Article>
    );
}