import Anchor from "@/components/Anchor";
import Article from "@/components/Article";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

export default function About() {
    return (
        <Article>
            <Title>Sobre</Title>
            <Paragraph>
                O projeto é inspirado no <Anchor href="https://github.com/eded001/spotify-analytics" target="_blank">Receiptify</Anchor>. O Spotify Analytics tem uma proposta parecida, mas também busca oferecer insights sobre suas atividades musicais. Além de outros projetos parecidos como: <Anchor href="https://www.statsforspotify.com/" target="_blank">Stats for Spotify</Anchor> e <Anchor href="https://trackify.am/" target="_blank">Trackify</Anchor>.
            </Paragraph>

            <Paragraph>
                Além disso, o projeto também tem fins estudantis. De maneira sucinta, o projeto serve como estudo de caso para demonstrar a aplicação de conceitos de análise de dados em um contexto real.
            </Paragraph>

            <Paragraph>
                Levando pro âmbito mais técnico da coisa, a aplicação usa React com NextJs. Além disso, a web api do Spotify, é claro.
            </Paragraph>
        </Article>
    );
}