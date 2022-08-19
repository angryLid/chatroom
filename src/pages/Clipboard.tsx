export const Clipboard = () => {
  return (
    <div className="h-screen flex flex-col ">
      <header className="bg-[#f4edf8] h-12">header</header>
      <main className="bg-[#eff1cd] grow">main</main>
      <footer className="bg-[#f0eaf3] h-8  flex items-center justify-center outline-none ">
        <input
          className="w-11/12 shadow-sm rounded-md pl-2 h-11/12 focus:outline-0"
          type="text"
          placeholder="Search ..."
        />
      </footer>
    </div>
  );
};
