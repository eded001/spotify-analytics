import Anchor from "@/components/Anchor";
import Article from "@/components/Article";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

export default function Contact() {
    return (
        <Article>
            <Title>Contato</Title>
            <Paragraph>
                Gostou do projeto ou quer ver mais do meu portfólio? Veja meu <Anchor href="https://eded001.github.io/portfolio/" target="_blank">portfólio</Anchor>.
            </Paragraph>

            <Paragraph>
                Quer me contatar ou ver outros projetos? Envie um e-mail para <Anchor href="mailto:edgarams.profissional@gmail.com" target="_blank">edgarams.profissional@gmail.com</Anchor> e acesse meu GitHub: <Anchor href="https://github.com/eded001" target="_blank">eded001</Anchor>.
            </Paragraph>
        </Article>
    );
}