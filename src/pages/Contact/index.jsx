import { Button } from "@/components/Button/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Contact = () => {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="mb-20">
        <h1 className="text-6xl pb-6">
          Entre em <span className="text-indigo-700">contato</span> conosco
        </h1>
        <p className="text-md">
          What unites us is relentless focus, fast execution, and our passion
          for software craftsmanship. We are all makers at heart and care deeply
          about the quality of our work, down to the smallest detail.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Fale com um membro da nossa equipe de vendas</CardTitle>
          </CardHeader>
          <CardContent>
            Ajudaremos você a encontrar os produtos e os preços certos para o
            seu negócio.
          </CardContent>
          <CardFooter className="p-0">
            <Button size="lg" className="w-full">
              Falar com vendas
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Suporte a produtos e contas</CardTitle>
          </CardHeader>
          <CardContent>
            Nossa central de ajuda está atualizada e sempre aberta para
            negócios. Se não encontrar a resposta que procura, estamos aqui para
            ajudar.
          </CardContent>
          <CardFooter className="p-0">
            <Button size="lg" className="w-full">
              Falar com suporte
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
