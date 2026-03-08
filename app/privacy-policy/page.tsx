import Anchor from "@/components/Anchor";
import Article from "@/components/Article";
import Paragraph from "@/components/Paragraph";
import Title from "@/components/Title";

export default function PrivacyPolicy() {
    return (
        <Article>
            <Title>Política de Privacidade</Title>
            <Paragraph>
                O projeto foi desenvolvido como um aplicativo de código aberto, baseado na API Web do Spotify. Ao optar por usar este aplicativo, você concorda com o uso do seu nome de usuário e dados da conta do Spotify para seus artistas e músicas favoritos.
            </Paragraph>

            <Paragraph>
                Nenhum dos dados usados é armazenado ou coletado em qualquer lugar, e NÃO é compartilhado com terceiros. Todas as informações são usadas exclusivamente para exibir as insights.
            </Paragraph>

            <Paragraph>
                Embora você possa ter certeza de que seus dados não estão sendo armazenados ou usados de forma maliciosa, se desejar revogar as permissões do Spotify Analytics, você pode acessar a página de aplicativos do seu dispositivo e clicar em &quot;REMOVER ACESSO&quot; no app. <Anchor href="https://support.spotify.com/us/article/spotify-on-other-apps/" target="_blank">Aqui</Anchor> está um guia mais detalhado sobre como fazer isso.
            </Paragraph>
        </Article>
    );
}