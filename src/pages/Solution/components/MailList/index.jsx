export const MailList = () => {
  return (
    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted text-foreground">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">William Smith</div>
          </div>
          <div className="ml-auto text-xs text-foreground">10 months ago</div>
        </div>
        <div className="text-xs font-medium">Meeting Tomorrow</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        Hi, let's have a meeting tomorrow to discuss the project. I've been
        reviewing the project details and have some ideas I'd like to share.
        It's crucial that we align on our next steps to ensure the project's
        success. Please come prepared with any questions or insights you may
        have. Looking forward to
      </div>
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
          meeting
        </div>
        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
          work
        </div>
        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
          important
        </div>
      </div>
    </button>
  );
};
