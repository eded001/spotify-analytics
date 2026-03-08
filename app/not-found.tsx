import Paragraph from "@/components/Paragraph";
import Separator from "@/components/Separator";
import Title from "@/components/Title";

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Title>404 <b>|</b> Página Não Encontrada</Title>
            <Paragraph>A página que você está procurando não existe.</Paragraph>
        </div>
    )
}