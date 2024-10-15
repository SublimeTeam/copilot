export const Chip = ({ children }) => {
  return (
    <div className="inline-block rounded-full bg-foreground text-background py-1 px-2 h-6 text-sm leading-3 mt-1 content-center">
      <div className="flex gap-1 items-center text-nowrap text-xs">
        {children}
      </div>
    </div>
  );
};
