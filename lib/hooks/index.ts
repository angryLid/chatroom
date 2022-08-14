import React, { useReducer } from "react";

export const getLS = (key: string) => {
  return localStorage.getItem(key) || "";
};

interface ISettings {
  user: string;
  room: string;
}
export function useSettingsLS() {
  const str = localStorage.getItem("settings");
  const settings = str
    ? (JSON.parse(str) as ISettings)
    : {
        user: "guest",
        room: "0",
      };
  const set = (payload: ISettings) => {
    localStorage.setItem("settings", JSON.stringify(payload));
    setUser(payload.user);
    setRoom(payload.room);
  };
  return [settings, set] as const;
}

export function useUser() {
  const user = localStorage.getItem("user") || "";
  const setUser = (payload: string) => {
    localStorage.setItem("user", payload);
  };
  return [user, setUser];
}

export function useRoom() {
  const room = localStorage.getItem("room") || "0";
  const setRoom = (payload: string) => {
    localStorage.setItem("room", payload);
  };
  return [room, setRoom] as const;
}

const initialState: ISettings = {
  user: "",
  room: "0",
};
function setUser(user: string) {
  return {
    type: "SET_USER" as const,
    payload: user,
  };
}

function setRoom(room: string) {
  return {
    type: "SET_ROOM" as const,
    payload: room,
  };
}
type AppActions = ReturnType<typeof setUser> | ReturnType<typeof setRoom>;

const reducer: React.Reducer<typeof initialState, AppActions> = (
  state,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
      };
    case "SET_ROOM":
      return {
        ...state,
        room: payload,
      };
    default:
      return state;
  }
};

export function useSettings() {
  const [state, dispatch] = useReducer(reducer, useSettingsLS()[0]);

  return {
    settings: state,
    setUser: (user: string) => dispatch(setUser(user)),
    setRoom: (room: string) => dispatch(setRoom(room)),
  };
}
