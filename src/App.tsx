import { InputPanel } from "./components/InputPanel";
import { Messages } from "./components/Messages";
import { RoomTitle } from "./components/RoomTitle";

export const App = () => {
  return (
    <main>
      {/* force include these class */}
      <div className="text-red-500" />
      <div className="text-orange-500" />
      <div className="text-yellow-500" />
      <div className="text-emerald-500" />
      <div className="text-teal-500" />
      <div className="text-cyan-500" />
      <div className="text-blue-500" />
      <div className="text-indigo-500" />
      <div className="text-violet-500" />
      <div className="text-pink-500" />
      <RoomTitle />
      <Messages />
      <InputPanel />
    </main>
  );
};
