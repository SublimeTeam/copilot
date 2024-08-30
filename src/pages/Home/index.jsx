import { Button } from "@/components/Button/index";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Play } from "lucide-react";
import { videos } from "./data";

export const Home = () => {
  return (
    <>
      <section className="py-24 min-h-[90dvh]">
        <h1 className="text-6xl mb-6">
        Explore o futuro do suporte com{" "}
          <span className="text-purple-700">IA generativa treinada</span>, potencializando a resolução de incidentes e tarefas.
        </h1>
        <p className="text-md mb-6">
        Cansado de sua equipe de suporte perder tempo?
          <br />
          O Copiloto ajuda sua equipe a obter respostas em segundos com IA.
        </p>
        <Button>Comece a avaliação gratuita</Button>
      </section>
      <section className="py-10 pb-36 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-20">
        <h2 className="text-6xl">Descubra o potencial da IA com o Copiloto.</h2>
        <p className="text-md mb-6 md:self-end md:place-self-end">
        Aumente a eficiência de seu time de suporte, utilizando inteligência artificial integrado ao seu processo de Helpdesk e Gestão de Tickets.
          <br />
                  </p>
        {videos.map(({ title, url, preview }, index) => (
          <a href={url} target="__blank" key={index}>
            <Card className="overflow-hidden">
              <div className="relative text-muted-foreground hover:text-white">
                <Play className="absolute inset-0 m-auto text-inherit z-10 size-10" />
                <img
                  src={preview}
                  className="filter grayscale hover:grayscale-0"
                />
              </div>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
            </Card>
          </a>
        ))}
      </section>
      <section className="flex flex-col md:py-24 md:flex-row md:justify-between md:items-end">
        <h2 className="text-6xl mb-6">
        <i>“Agora, fornecemos respostas 30% mais rápidas, aumentando <br /> a produtividade por agente..”</i>
        </h2>
        <p className="text-md mb-6 md:self-end md:place-self-end">
        <strong>XU Miragaia</strong>, gerente de serviços (atendimento digital ao cliente), Tesla
          <br />
                  </p>
                  <br />
        <div>
          <Button>Experimente o Copiloto</Button>
          <Button variant="secondary">Fale com um especialista</Button>
        </div>
      </section>
      
    </>
  );
};
