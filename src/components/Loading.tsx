export const Loading = () => {
  const className =
    "animate-pulse origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white ";
  const degrees = `
     rotate-[0]  .
     rotate-[30deg]  .
     rotate-[60deg]  .
     rotate-[90deg]  .

     rotate-[120deg]  .
     rotate-[150deg]  .
     rotate-[180deg]  .
     rotate-[210deg]  .

     rotate-[240deg]  .
     rotate-[270deg]  .
     rotate-[300deg]  .
     rotate-[330deg]  .
  `.split(".");

  const delays = Array.from({ length: 12 }, (_, i) => `${-2.2 + i * 0.1}s`);
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-zinc-500 opacity-50 flex justify-center items-center">
      <div className="relative w-[120px] h-[120px] bg-black rounded-lg p-[20px]">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${className} ${degrees[i]}`}
              style={{ animationDelay: delays[i] }}
            />
          ))}
      </div>
    </div>
  );
};
