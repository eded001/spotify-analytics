import Paragraph from "@/components/Paragraph";
import { BsSpotify } from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Paragraph justify="center">
        Interessado em <b>gerar insights</b>, <b>compartilhar descobertas</b> e <b>saber mais de você</b> baseado no <b>seu gosto musical</b>?
        <br />
        Veja tudo isso com apenas um <b>click</b>!
      </Paragraph>
      <button className="bg-[#1db954] rounded-2xl flex items-center font-medium text-xl p-2 gap-2 hover:cursor-pointer hover:bg-[#1aa74c] active:bg-[#179443]">
        Entrar com Spotify
        <BsSpotify />
      </button>
    </div>
  );
}