import { PropsWithChildren } from "react";
interface IProps {
  visible: boolean;
  close?: () => void;
}
export const Modal = ({ children, visible }: PropsWithChildren & IProps) => {
  return (
    <div
      className={`z-50 ease-in-out delay-1000 fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black bg-opacity-20 ${
        visible ? "flex" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};
