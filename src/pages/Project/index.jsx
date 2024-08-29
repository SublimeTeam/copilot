import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Terminal } from "lucide-react";

const technologies = [
  {
    title: "React",
    description:
      "Utilizado para construir componentes reutilizáveis e gerenciar o estado da aplicação, tornando a interface mais dinâmica e interativa.",
  },
  {
    title: "HTML, CSS e JavaScript",
    description:
      "Construção da estrutura básica das páginas, definir o estilo visual e implementar interações com o usuário.",
  },
  {
    title: "Subalgoritmos",
    description:
      "Encapsulamos funcionalidades específicas, tornando o código mais organizado e fácil de entender. Preparado para maior escalabilidade.",
  },
  {
    title: "Estrutura de dados",
    description:
      "Arrays e listas foram utilizadas para armazenar e manipular dados, como listas de mensagens, informações do usuário, etc.",
  },
];

export const Project = () => {
  return (
    <>
      <section className="py-24 gap-6">
        <div className="flex justify-between pb-20 items-end">
          <h1 className="text-6xl flex-1">
            Built on <span className="text-indigo-700">strong</span>
            <br /> foundations
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
          <h2 className="text-6xl">
            Meet <span className="text-indigo-700">the team</span> behind the
            project
          </h2>
          <p className="text-md">
            What unites us is relentless focus, fast execution, and our passion
            for software craftsmanship. We are all makers at heart and care
            deeply about the quality of our work, down to the smallest detail.
          </p>
        </div>
        <div className="flex gap-6 w-full">
          {Array.from(Array(4)).map((_, index) => (
            <div
              className="odd:translate-y-10 flex-1 min-w-28 flex-wrap max-h-min rounded-none border-none"
              key={index}
            >
              <img
                src="https://github.com/LeandrodeLimaC.png"
                alt=""
                className="filter grayscale hover:grayscale-0 transition-all"
              />
              <div className="mt-0.5 text-foreground">
                <p className="text-lg tracking-normal">
                  Leandro de Lima Cuminato
                </p>
                <p className="text-muted-foreground"> Frontend Engineer </p>
                <p>RM 5560556</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
