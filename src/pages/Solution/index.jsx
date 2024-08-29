import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
import { Activity } from "lucide-react";
// import { MailList } from "./components/MailList/index";
// import { MailList } from "./components/MailList/index";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LastTickets = () => {
  return (
    <div className="gap-2 mt-12">
      <p className="text-foreground pb-4">Encontramos os seguintes tickets</p>
      <div>
        <Card className="  ">
          <CardHeader>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Activity className="size-6 p-1 rounded-full text-green-500 bg-green-500 bg-opacity-25" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <div></div>
    // <div className="flex flex-col gap-2 p-4 pt-0 w-80 bg-background h-full bg-red-950">
    //   <Tabs>
    //     <div className="flex justify-between items-center py-4">
    //       <p className="text-lg text-foreground">Copilot</p>
    //       <TabsList>
    //         <TabsTrigger value="all">All</TabsTrigger>
    //         <TabsTrigger value="my-issues">My issues</TabsTrigger>
    //       </TabsList>
    //     </div>
    //     <Input />
    //     <TabsContent value="all">
    //       <MailList />
    //     </TabsContent>
    //     <TabsContent value="my-issues">
    //       Não há nada atríbuido à você
    //     </TabsContent>
    //   </Tabs>
    // </div>
  );
};

export const Solution = () => {
  return (
    <div className="flex h-screen w-full dark">
      <SideBar />
      <div className="flex w-full h-full justify-center bg-background">
        <div className="w-[75ch]">
          <h1 className="text-5xl text-muted-foreground pt-20">
            <span className="text-primary">Olá, Leandro</span>
            <br />
            Posso ajudar?
          </h1>

          <LastTickets />
        </div>
      </div>
    </div>
  );
};
