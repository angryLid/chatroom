import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
interface CustomInputProps {
  label: string;
  state: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const CustomInput = ({ label, state, onChange }: CustomInputProps) => {
  return (
    <div className=" h-12 bg-white  py-2  rounded-t-lg mx-auto flex items-center">
      <label className="w-1/3 " htmlFor={label}>
        {label}
      </label>
      <input
        value={state}
        onChange={onChange}
        className="w-2/3 outline-none"
        type="text"
        id={label}
        placeholder={label}
      />
    </div>
  );
};
export const Admin = () => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState(getRoomID());
  const [field3, setField3] = useState("");

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.info(token);
        console.info(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <main className="bg-[#f1f1f7] h-screen pt-4">
      <h1 className="text-xl text-center mb-3 text-slate-900">
        Administration
      </h1>
      <div className="rounded-lg w-5/6 mx-auto bg-white px-4 py-1">
        <CustomInput
          label="Secret"
          state={field1}
          onChange={(e) => {
            setField1(e.currentTarget.value);
          }}
        />
        <div className=" border-b border-slate-500/50 mx-auto bg-white" />
        <CustomInput
          label="Room"
          state={field2}
          onChange={(e) => {
            setField2(e.currentTarget.value);
          }}
        />
        <div className=" border-b border-slate-500/50 mx-auto bg-white" />
        <CustomInput
          label="Password"
          state={field3}
          onChange={(e) => {
            setField3(e.currentTarget.value);
          }}
        />
      </div>
      <div className="text-center my-6">
        <button className="bg-green-500 text-white leading-7 rounded-md px-4 py-1 text-lg font-light shadow-md tracking-wider">
          Add Room
        </button>
        <button
          className="bg-green-500 text-white leading-7 rounded-md px-4 py-1 text-lg font-light shadow-md tracking-wider"
          onClick={logIn}
        >
          Log In
        </button>
      </div>
    </main>
  );
};

function getRoomID() {
  const now = String(Number(new Date()));
  return `${now.slice(0, 3)}-${now.slice(3, 6)}-${now.slice(6, 10)}`;
}
