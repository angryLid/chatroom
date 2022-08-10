import { InputPanel } from "./components/InputPanel";
import { Messages } from "./components/Messages";
import { RoomTitle } from "./components/RoomTitle";

export const App = () => {
  return (
    <main>
      <RoomTitle />
      <Messages />
      <InputPanel />
    </main>
  );
};
