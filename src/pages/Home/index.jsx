import { Button } from "@/components/Button/index";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Play } from "lucide-react";
import { videos } from "./data";

export const Home = () => {
  return (
    <>
      <section className="py-24 min-h-[90dvh]">
        <h1 className="text-6xl mb-6">
          Copilot leverages{" "}
          <span className="text-purple-700">generative AI</span> to help you
          scale your support.
        </h1>
        <p className="text-md mb-6">
          Meet the system tailored to help your support perform 80x better.
          <br />
          Enhance your CX—integrate it into your Helpdesk today.
        </p>
        <Button>Get Started</Button>
      </section>
      <section className="py-10 pb-36 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-20">
        <h2 className="text-6xl">A good thing just got better</h2>
        <p className="text-md mb-6 md:self-end md:place-self-end">
          Meet the system tailored to help your support perform 80x better.
          <br />
          Enhance your CX—integrate it into your Helpdesk today.
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
          Smart work, <br /> exceptional results
        </h2>
        <div>
          <Button>Get started</Button>
          <Button variant="secondary">Talk to sales</Button>
        </div>
      </section>
    </>
  );
};
