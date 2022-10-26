export const Loading = () => {
  const className =
    "animate-pulse origin-[40px_40px] after:content-[''] after:block after:absolute after:top-[3px] after:left-[37px] after:w-[6px] after:h-[18px] after:rounded-[20%] after:bg-white ";
  const degrees = `
     rotate-[0] animation-delay-100 .
     rotate-[30deg] animation-delay-300 .
     rotate-[60deg] animation-delay-500 .
     rotate-[90deg] animation-delay-700 .

     rotate-[120deg] animation-delay-900 .
     rotate-[150deg] animation-delay-1100 .
     rotate-[180deg] animation-delay-1300 .
     rotate-[210deg] animation-delay-1500 .

     rotate-[240deg] animation-delay-1700 .
     rotate-[270deg] animation-delay-1900 .
     rotate-[300deg] animation-delay-2100 .
     rotate-[330deg] animation-delay-2300 .
  `.split(".");

  // const delays = Array.from({ length: 12 }, (_, i) => `${i * 0.1}s`);
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-zinc-500 opacity-50 flex justify-center items-center">
      <div className="relative w-[120px] h-[120px] bg-black rounded-lg p-[20px]">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={`${className} ${degrees[i]}`} />
          ))}
      </div>
    </div>
  );
};
