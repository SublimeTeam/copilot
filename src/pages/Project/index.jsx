import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { team, technologies } from "./data";

export const Project = () => {
  return (
    <>
      <section className="py-24 gap-6">
        <div className="flex justify-between pb-20 items-end gap-8">
          <h1 className="text-5xl flex-1">
            Construído sob <span className="text-indigo-700">sólidas</span>{" "}
            fundações
          </h1>
          <p className="max-w-[60ch] flex-1">
            O desenvolvimento do projeto contou com a aplicação de diversas
            tecnologias e conceitos abordados nas disciplinas, formando uma base
            sólida para a construção da solução final.
          </p>
        </div>

        <div className="flex w-full gap-4">
          {technologies.map(({ title, description }) => (
            <Alert className="max-h-min" key={title}>
              <Terminal className="h-4 w-4 stroke-indigo-700" />
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </section>

      <section className="py-10 mb-20">
        <p className="text-xs text-muted-foreground">TEAM</p>
        <Separator className="mt-2 mb-9" />
        <div className="flex flex-col gap-6 mb-10">
          <h2 className="text-5xl">
            Conheça <span className="text-indigo-700">o time</span> responsável
            pelo projeto
          </h2>
          <p className="text-md">
            O que nos une é a nossa dedicação incansável, a execução ágil e a
            paixão vibrante pela criação de software. Somos criadores de coração
            e nos entregamos de corpo e alma à excelência, cuidando com esmero
            até dos menores detalhes.
          </p>
        </div>
        <div className="flex gap-6 w-full">
          {team.map(({ name, photo, rm, role }, index) => (
            <div
              className="odd:translate-y-10 flex-1 min-w-28 flex-wrap max-h-min rounded-none border-none"
              key={index}
            >
              <img
                src={photo}
                className="filter grayscale hover:grayscale-0 transition-all"
              />
              <div className="mt-0.5 text-foreground">
                <p className="text-lg tracking-normal">{name}</p>
                <p className="text-muted-foreground">{role}</p>
                <p>{rm}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
