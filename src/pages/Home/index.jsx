import { Button } from "@/components/Button/index";

export const Home = () => {
  return (
    <>
      <section className="py-20 min-h-[90dvh]">
        <div className="flex flex-col gap-6 max-w-[630px]">
          <h1 className="text-5xl">
            Copilot is a purpose-build tool that leverages{" "}
            <span className="text-indigo-700">generative AI</span> to help you
            scale your support.
          </h1>
          <p className="text-sm">
            Meet the system tailored to help your support perform 80x better.{" "}
            <br />
            Improve your CX, boost your CSAT and give you insights
          </p>
          <Button className="max-w-min">Start building</Button>
        </div>
      </section>
      <section className="py-10">
        <div>
          <h2 className="text-5xl">A good thing just got better</h2>
          <p></p>
        </div>
      </section>
      <section className="py-10 flex justify-between items-end">
        <h2 className="text-5xl">
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
